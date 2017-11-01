import { getJSON, formProjectApiUrl } from '../../utils/ajax';
import { withTimeout } from '../../utils';

/**
 * Fetch a project with full plan version history
 * @async
 * @param {object} project
 * @return {Promise}
 */
export const fetchPlanHistory = plan => withTimeout(
  2 * 60 * 1000,
  getJSON(`${formProjectApiUrl(plan)}?allPlanVersions=true`)
);
