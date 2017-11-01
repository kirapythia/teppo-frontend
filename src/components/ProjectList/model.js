import t from '../../locale';
import { formProjectApiUrl, getJSON, ServerResponseError } from '../../utils/ajax';
import { withTimeout } from '../../utils';

export const fetchProjectList = () =>
  withTimeout(2 * 60 * 1000, getJSON(formProjectApiUrl()))
    .catch((error) => {
      throw new ServerResponseError(t('network.error.project_list.fetch'), error.status);
    });
