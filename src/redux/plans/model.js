import { wait, withTimeout } from '../../utils';
import { postJSON } from '../../utils/ajax';

/**
 * FIXME: Not actually implemented yet
 * Update plan object.
 * @async
 * @param {object} plan
 * @returns {Promise}
 */
export const updatePlan = plan => wait(500, plan);

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
  2 * 60 * 1000,
  postJSON(`/pythia/v1/projects/${values.projectId}/plans/`, values)
);

