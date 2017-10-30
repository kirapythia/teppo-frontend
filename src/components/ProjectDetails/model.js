import * as R from 'ramda';
import t from '../../locale';
import { formProjectApiUrl, getJSON, putJSON, ServerResponseError } from '../../utils/ajax';
import { serverDateToString, withTimeout } from '../../utils';
/**
 * Fetch project from the server by id
 * @async
 * @param {number} projectId
 * @return {Promise}
 */
export const fetchProject = projectId => withTimeout(
  2 * 60 * 1000,
  getJSON(formProjectApiUrl({ projectId }))
)
  .catch((error) => {
    throw new ServerResponseError(t('network.error.project.fetch'), error.status);
  });

export const updateProject = project => withTimeout(
  2 * 60 * 1000,
  putJSON(formProjectApiUrl(project), project)
)
  .catch((error) => {
    throw new ServerResponseError(t('network.error.project.update'), error.status);
  });

/**
 * Format detail values for the ShowDetails component
 * @private
 * @type {function}
 * @param {object} plan
 * @return {object}
 */
export const formProjectDetailFields = project => ([
  { label: t('project.hansuProjectId'), value: project.hansuProjectId },
  { label: t('plan.primary_id'), value: project.mainNo },
  { label: t('project.created'), value: `${serverDateToString(project.createdAt)} (${project.createdBy})` },
  { label: t('project.updated'), value: `${serverDateToString(project.updatedAt)} (${project.updatedBy})` },
  { label: t('project.completed'), value: project.completed },
  { label: t('project.description'), value: project.description },
]);

/**
 * Sort plans by identifier (main/subnumber) descending
 * @param {object[]} plans
 * @return {object[]} sorted plans
 */
export const sortPlansBySubNo = R.sortBy(R.prop('subNo'));
