import t from '../../locale';
import { getJSON, putJSON, ServerResponseError } from '../../utils/ajax';
import { serverDateToString, withTimeout } from '../../utils';

const FETCH_PROJECT_URL = '/pythia/v1/projects/';

/**
 * Fetch project from the server by id
 * @async
 * @param {number} projectId
 * @return {Promise}
 */
export const fetchProject = projectId => withTimeout(2 * 60 * 1000, getJSON(`${FETCH_PROJECT_URL}${projectId}`))
  .catch((error) => {
    throw new ServerResponseError(t('network.error.project.fetch'), error.status);
  });

export const updateProject = project => withTimeout(
  2 * 60 * 1000,
  putJSON(`${FETCH_PROJECT_URL}${project.projectId}`, project)
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
