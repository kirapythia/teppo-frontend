import * as R from 'ramda';
import t, { tpl } from '../../locale';
import { postJSON, putJSON, ServerResponseError } from '../../utils/ajax';
import { withTimeout, formPlanIdentifier } from '../../utils';
import { parsePlanProps } from '../../utils/PlanFilenameParser';

/**
 * Ajax request timeout in milliseconds (2 minutes)
 * @type {number}
 */
const REQUEST_TIMEOUT = 2 * 60 * 1000;

/**
 * Form an url for plan save
 * @private
 * @param {object} plan
 * @param {number} plan.projectId
 * @return {string}
 */
const planSaveUrl = ({ projectId }) => `/pythia/v1/projects/${projectId}/plans/`;
/**
 * Form an url for plan save
 * @private
 * @param {object} plan
 * @param {number} plan.projectId
 * @return {string}
 */
const planEditUrl = ({ projectId, planId }) => `/pythia/v1/projects/${projectId}/plans/${planId}`;

/**
 * Form an url for file upload
 * @private
 * @param {object} plan
 * @param {number} plan.projectId
 * @param {number} plan.planId
 * @return {string}
 */
const fileUrl = ({ projectId, planId }) => `/pythia/v1/projects/${projectId}/plans/${planId}/files/`;

/**
 * Upload a file to the server
 * @private
 * @async
 * @param {object} plan
 * @param {File} file
 * @return {string} File url received as a response
 */
const uploadFile = async (plan, file) => {
  // form form data body for the request
  const data = new FormData();
  data.append('mfile', file);
  // data.append('plan', new Blob([JSON.stringify(plan)], { type: 'application/json' }));
  // wait for the response
  const response = await withTimeout(
    REQUEST_TIMEOUT,
    fetch(fileUrl(plan), { method: 'POST', body: data })
  );
  // if an error status was received then throw
  if (!response.ok) {
    throw new ServerResponseError(tpl('network.error.file.upload', { fileName: file.name }), response.status);
  }
  // resolve response body promise (returns an url string)
  return response.text();
};

/**
 * Send plan to the server.
 * @private
 * @async
 * @param {object} values Values from the plan form
 * @return {object} Plan received from the server as response
 */
const savePlan = async (values) => {
  if (!values.projectId) {
    return Promise.reject(new Error('InvalidArgumentsException: ProjectId is missing or invalid!'));
  }

  try {
    return await withTimeout(REQUEST_TIMEOUT, postJSON(planSaveUrl(values), values));
  } catch (e) {
    throw new ServerResponseError(t('network.error.plan.create'), e.status);
  }
};

/**
 * Save file and plan in a single promise. Resolves only when both succeed
 * @private
 * @async
 * @param {object} planValues Values related to plan
 * @param {File} file File to be uploaded
 * @return {object}
 */
const savePlanWithFile = async (planValues, file) => {
  // resolve plan properties from the filename
  const propsFromFilename = parsePlanProps(file.name);
  // prefer values from the filename, if a property is not present then
  // use value from the plan form
  const resolvedPlanValues = Object.assign({}, planValues, propsFromFilename);
  // send the create request to the server and wait for the response
  const plan = await savePlan(resolvedPlanValues);
  // upload the file to s3 bucket and wait for the success
  // use the response from the create request because we need the plan id
  const url = await uploadFile(plan, file);
  // add link url to the response and resolve
  return ({ ...plan, url });
};

/**
 * Loop all files and save them as individual plans. Try to resolve
 * their subNo from the file name
 * @private
 * @async
 * @param {object} planValues Values related to plan
 * @param {File} file File to be uploaded
 * @return {object[]} All the saved plans
 */
const saveFilesAsPlans = values => new Promise((resolve, reject) => {
  const { files } = values;
  const succeeded = [];
  const rejected = [];
  /**
   * Resolve the promise when all file upload/plan save promises are resolved or rejected
   * and at least one of the promises succeeded. If all requests failed then reject the promise
   */
  const resolveWhenAllDone = () => {
    if (rejected.length === files.length) {
      reject(new Error(t('network.error.plan.create')));
    } else if (succeeded.length + rejected.length === files.length) {
      resolve([succeeded, rejected]);
    }
  };
  // omit files property from other plan values because files are uploaded separately
  const planValues = R.omit(['files'], values);

  // loop all files and save a plan object for each one and upload file to s3
  // put each resolve or reject value to a corresponding basket and resolve
  // promise when all requests are done
  files.forEach((file) => {
    savePlanWithFile(planValues, file)
      .then((result) => {
        succeeded.push(result);
        resolveWhenAllDone(resolve);
      })
      .catch(() => {
        rejected.push(file.name);
        resolveWhenAllDone(resolve);
      });
  });
});

/**
 * Save plan(s) to the server
 * @async
 * @param {object} values
 * @return {object|object[]} Plan(s) received from the server as response(s)
 */
export const savePlans = async (values) => {
  if (values.files && values.files.length) {
    return saveFilesAsPlans(values);
  }

  const plan = await savePlan(values);
  return [[plan], []];
};

/**
 * Send edit request to the server
 * @private
 * @async
 * @param {object} values Values from the plan form
 * @return {object} Plan received from the server as response
 */
const doEditPlanRequest = async (values) => {
  if (!values.planId) {
    return Promise.reject(new Error(t('plan.error.edit.no_id')));
  }

  try {
    return await withTimeout(REQUEST_TIMEOUT, putJSON(planEditUrl(values), values));
  } catch (e) {
    throw new ServerResponseError(t('network.error.plan.edit'), e.status);
  }
};

/**
 * Edit and send project to the server
 * @async
 * @param {object} values
 * @return {object} Plan received from the server as response
 */
export const editPlan = async (values) => {
  try {
    const { files } = values;

    // send edit plan request and wait for success
    const plan = await doEditPlanRequest(values);

    // if a file was added to the plan then try to upload it to the s3 bucket
    if (files.length) {
      // do the request and wait for the success
      const fileUploadResponse = await uploadFile(values, files[0]);
      // add link url to the response and resolve
      return ({ ...plan, url: fileUploadResponse });
    }
    // if a file was not added then just resolve with response received from the edit request
    return plan;
  } catch (e) {
    throw new ServerResponseError(t('network.error.plan.edit'), e.status);
  }
};

/**
 * Check if a list contains double values
 * @private
 * @param {string[]} list
 * @return {boolean}
 */
const containsDoubles = list => R.uniq(list).length < list.length;
/**
 * Check if two lists contains one or more same values
 * @private
 * @param {string[]} listA
 * @param {string[]} listB
 * @return {boolean}
 */
const listsContainSameValues = (listA, listB) => !!R.intersection(listA, listB).length;

/**
 * Form a list of identifiers from the file list
 * @private
 * @param {object} project
 * @param {object[]} files
 * @return {string[]}
 */
const formPlanIdentifiersFromFiles = (projectId, files) => R.pipe(
  R.pluck('name'),
  R.map(parsePlanProps),
  R.map(R.assoc('projectId', projectId)),
  R.map(formPlanIdentifier),
)(files);

/**
 * Assert that form values will not create plans with same projectId, mainNo and subNo combination
 * for they are considered to be new versions of the existing plan
 * @param {object} values Values from the plan form
 * @param {object} project The project to which the plans are being added
 * @return {string|undefined} Returns an error message or undefined if validation passes
 */
export const validatePlans = allPlans => (values) => {
  const { files = [] } = values;

  // if project already has plan with same identifier combination
  if (allPlans.find(R.eqBy(formPlanIdentifier, values))) {
    return { subNo: t('validation.message.collides_existing_plan_values') };
  }

  const existing = allPlans.map(formPlanIdentifier);
  const newPlans = formPlanIdentifiersFromFiles(values.projectId, files);

  // if project already has a plan with the same identifier combination
  if (listsContainSameValues(existing, newPlans)) {
    return { files: t('validation.message.double_plan_values') };
  }

  // if files list has multiple plans with the same identifier combination
  if (containsDoubles(newPlans)) {
    return { files: t('validation.message.double_plan_values') };
  }

  return undefined;
};
