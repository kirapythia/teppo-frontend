import t from '../../locale';
import { postJSON, ServerResponseError } from '../../utils/ajax';

export const SAVE_PROJECT_URL = '/pythia/v1/projects/';

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
