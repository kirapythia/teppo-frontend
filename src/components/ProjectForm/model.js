import t from '../../locale';
import { get, postJSON, ServerResponseError } from '../../utils/ajax';

export const SAVE_PROJECT_URL = '/pythia/v1/projects/';
export const FETCH_PROJECT_BY_HANSU_PROJECT_ID_URL = '/pythia/v1/projects/hansuprojectid/';

/**
 * Send project to the server. FIXME: not actually implemented yet.
 * @async
 * @param {object} project Values from the project form
 * @return {Promise}
 */
export const saveProject = project =>
  postJSON(SAVE_PROJECT_URL, project)
    .catch((error) => {
      throw new ServerResponseError(t('network.error.project.create'), error.status);
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
