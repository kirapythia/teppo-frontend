import t from '../../locale';
import { postJSON, putJSON, ServerResponseError } from '../../utils/ajax';
import { withTimeout } from '../../utils';

/**
 * Send plan to the server.
 * @async
 * @param {object} plan Values from the plan form
 * @return {Promise}
 */
export const savePlan = plan =>
  withTimeout(2 * 60 * 1000, postJSON(`/pythia/v1/projects/${plan.projectId}/plans/`, plan)
    .catch((error) => {
      throw new ServerResponseError(t('network.error.plan.create'), error.status);
    }));

/**
 * Edit and send project to the server
 * @async
 * @param {object} plan
 * @return {Promise}
 */
export const editPlan = plan => new Promise((resolve, reject) => {
  if (!plan.planId) return reject(new Error(t('plan.error.edit.no_id')));
  return putJSON(`/pythia/v1/projects/${plan.projectId}/plans/${plan.planId}`, plan)
    .then(resolve)
    .catch((error) => {
      reject(new ServerResponseError(t('network.error.plan.edit'), error.status));
    });
});
