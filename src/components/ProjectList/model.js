import t from '../../locale';
import { getJSON, ServerResponseError } from '../../utils/ajax';
import { withTimeout } from '../../utils';

const FETCH_PROJECT_LIST_URL = '/pythia/v1/projects/';

export const fetchProjectList = () =>
  withTimeout(2 * 60 * 1000, getJSON(FETCH_PROJECT_LIST_URL))
    .catch((error) => {
      throw new ServerResponseError(t('network.error.project_list.fetch'), error.status);
    });
