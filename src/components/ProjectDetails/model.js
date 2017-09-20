import t, { tpl } from '../../locale';

const FETCH_PROJECT_URL = '/pythia/v1/projects/';

/**
 * Error indicating that an error was caused because
 * requested resource was not found
 * @class ResourceNotFoundError
 */
export class ResourceNotFoundError extends Error {}

/**
 * Fetch project from the server by id
 * @async
 * @param {number} projectId
 * @return {Promise}
 */
export const fetchProject = projectId => new Promise((resolve, reject) => {
  fetch(
    `${FETCH_PROJECT_URL}${projectId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    // when fetch succeeds (not necessarily with 200 OK)
    .then((response) => {
      // check if response was ok (status >= 200 and <= 299)
      if (response.ok) {
        // parse json in response body
        resolve(response.json());
        return;
      }

      if (response.status === 404) {
        reject({
          type: 'ResourceNotFoundError',
          message: tpl('network.error.project.not_found', { projectId }),
        });
        return;
      }
      // if response was not ok then return an error
      reject({ type: 'Error', message: t('network.error.project.fetch') });
    })
    // catch fetch fails and request not ok errors
    .catch(() => reject({ type: 'Error', message: t('network.error.project.fetch') }));
});

