import t, { tpl } from '../../locale';
import { postJSON, putJSON, ServerResponseError } from '../../utils/ajax';
import { omit, withTimeout } from '../../utils';
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
const saveFilesAsPlans = async (values) => {
  const { files } = values;
  // omit files property from other plan values because files are uploaded separately
  const planValues = omit(['files'], values);
  const promises = files.map(file => savePlanWithFile(planValues, file));
  // save plan along with the file
  return Promise.all(promises);
};

/**
 * Save plan(s) to the server
 * @async
 * @param {object} values
 * @return {object|object[]} Plan(s) received from the server as response(s)
 */
export const savePlans = async values => (
  values.files && values.files.length
    ? saveFilesAsPlans(values)
    : savePlan(values)
);

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
