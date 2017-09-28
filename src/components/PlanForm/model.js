import t from '../../locale';
import { postJSON, putJSON, ServerResponseError } from '../../utils/ajax';
import { omit, withTimeout } from '../../utils';

/**
 * Ajax request timeout in milliseconds (2 minutes)
 * @type {number}
 */
const REQUEST_TIMEOUT = 2 * 60 * 1000;

const uploadFile = (plan, file) => {
  const data = new FormData();
  data.append('mfile', file);

  return fetch(`/pythia/v1/projects/${plan.projectId}/plans/${plan.planId}/files/`, {
    method: 'POST',
    body: data,
  });
};

/*
 * Send plan to the server.
 * @async
 * @param {object} plan Values from the plan form
 * @return {Promise}
 */
export const savePlan = async (plan) => {
  try {
    const file = plan.url;
    // omit file property because it will be uploaded later
    const updateObject = omit(['url'], plan);
    // send the create request to the server and wait for the response
    const createResponse = await withTimeout(
      REQUEST_TIMEOUT,
      postJSON(`/pythia/v1/projects/${plan.projectId}/plans/`, updateObject)
    );

    if (file) {
      // if a file was added then try to upload it to the s3 bucket
      // do the request and wait for the success
      const fileUploadResponse = await withTimeout(
        REQUEST_TIMEOUT,
        // use the response from the create request because we need the plan id
        uploadFile(createResponse, file)
      );
      // add link url to the response and resolve
      return ({ ...createResponse, url: fileUploadResponse });
    }
    // if a file was not added then just resolve with response received from the create request
    return createResponse;
  } catch (e) {
    throw new ServerResponseError(t('network.error.plan.create'), e.status);
  }
};

/**
 * Edit and send project to the server
 * @async
 * @param {object} plan
 * @return {Promise}
 */
export const editPlan = async (plan) => {
  if (!plan.planId) throw new Error(t('plan.error.edit.no_id'));

  try {
    const file = plan.url;
    const hasUnUploadedFile = file && file instanceof File;
    const updateObject = hasUnUploadedFile
      ? omit(['url'], plan)
      : plan;

    // send edit plan request and wait for success
    const editResponse = await withTimeout(
      REQUEST_TIMEOUT,
      putJSON(`/pythia/v1/projects/${plan.projectId}/plans/${plan.planId}`, updateObject)
    );

    // if a file was added to the plan then try to upload it to the s3 bucket
    if (hasUnUploadedFile) {
      // do the request and wait for the success
      const fileUploadResponse = await withTimeout(
        REQUEST_TIMEOUT,
        uploadFile(plan, file)
      );
      // add link url to the response and resolve
      return ({ ...editResponse, url: fileUploadResponse });
    }
    // if a file was not added then just resolve with response received from the edit request
    return editResponse;
  } catch (e) {
    throw new ServerResponseError(t('network.error.plan.edit'), e.status);
  }
};
