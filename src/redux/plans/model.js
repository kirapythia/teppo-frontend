import { wait, withTimeout } from '../../utils';
import { formPlanApiUrl, postJSON, putJSON } from '../../utils/ajax';

const REQUEST_TIMEOUT = 2 * 60 * 1000;

/**
 * Update plan object.
 * @async
 * @param {object} plan
 * @returns {Promise}
 */
export const updatePlan = plan => withTimeout(
  REQUEST_TIMEOUT,
  putJSON(formPlanApiUrl(plan), plan)
);

/**
 * FIXME: Not actually implemented yet
 * Remove a plan.
 * @async
 * @param {object} plan
 * @returns {Promise}
 */
export const removePlan = plan => wait(500, plan);

/**
 * Create a new plan without files with given props
 * @async
 * @param {object} values
 * @returns {Promise}
 */
export const createPlan = values => withTimeout(
  REQUEST_TIMEOUT,
  postJSON(formPlanApiUrl(values), values)
);

