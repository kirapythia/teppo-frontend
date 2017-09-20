import t from '../../locale';
import { getJSON, ServerResponseError } from '../../utils/ajax';

const FETCH_PROJECT_URL = '/pythia/v1/projects/';

/**
 * Fetch project from the server by id
 * @async
 * @param {number} projectId
 * @return {Promise}
 */
export const fetchProject = projectId =>
  getJSON(`${FETCH_PROJECT_URL}${projectId}`)
    .catch((error) => {
      throw new ServerResponseError(t('network.error.project.fetch'), error.status);
    });

