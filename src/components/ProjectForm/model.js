import t from '../../locale';
import { get, postJSON, putJSON, ServerResponseError } from '../../utils/ajax';
import { withTimeout } from '../../utils';

export const PROJECT_URL = '/pythia/v1/projects/';
export const FETCH_PROJECT_BY_HANSU_PROJECT_ID_URL = '/pythia/v1/projects/hansuprojectid/';

/**
 * Send project to the server.
 * @async
 * @param {object} project Values from the project form
 * @return {Promise}
 */
export const saveProject = project =>
  withTimeout(2 * 60 * 1000, postJSON(PROJECT_URL, project)
    .catch((error) => {
      throw new ServerResponseError(t('network.error.project.create'), error.status);
    }));

/**
 * Edit and send project to the server
 * @async
 * @param {object} project
 * @return {Promise}
 */
export const editProject = project => new Promise((resolve, reject) => {
  if (!project.projectId) return reject(new Error(t('project.error.edit.no_id')));
  return putJSON(`${PROJECT_URL}${project.projectId}`, project)
    .then(resolve)
    .catch((error) => {
      reject(new ServerResponseError(t('network.error.project.edit'), error.status));
    });
});

/**
 * Validate hansuProjectId on server by fetching project by hansuProjectId.
 * If server responds with 404 then we can assume that the id is not used.
 * @async
 * @param {string} hansuprojectid
 * @return {Promise}
 */
export const validateHansuProjectId = ({ hansuProjectId }) =>
  get(`${FETCH_PROJECT_BY_HANSU_PROJECT_ID_URL}${hansuProjectId}`)
    .then((response) => {
      // eslint-disable-next-line no-throw-literal
      if (response.ok) throw { hansuProjectId: t('validation.message.hansu_project_id_used') };
      return undefined;
    });
