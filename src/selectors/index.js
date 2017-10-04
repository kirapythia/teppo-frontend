import { createSelector } from 'reselect';
<<<<<<< 7d22897333772bfe9460595ab763aa23e72578b3
import { isOneOf, propSorter } from '../utils';
=======
import { mapToList } from '../utils';
>>>>>>> Plan commenting and toggling comment's approval

/**
 * A collection of selectors that return values from the state. Used mainly
 * in mapStateToProps function when mapping state values to components using
 * react-redux library's connect function
 * @module selectors
 */

const getProjectDetails = ({ project }) => project;
const getPlans = ({ plans }) => plans;
const getComments = ({ comments }) => comments.comments;

/**
 * Return url's projectId
 * @param {object} state
 * @return {number}
 */
export const getCurrentProjectId = state => (state.router.params || {}).projectId;
export const getCurrentPlanId = state => (state.router.params || {}).planId;

/**
 * Select current project from state if it matches
 * the project id in the url
 * @param {object} state
 * @return {object} project
 */
export const getCurrentProject = createSelector(
  getCurrentProjectId,
  getProjectDetails,
  (projectId, project = {}) => (projectId && project.projectId === +projectId
    ? project
    : undefined
  )
);

/**
 * Select current plan from state if it matches
 * the plan id in the url
 * @param {object} state
 * @return {object} project
 */
export const getCurrentPlan = createSelector(
  getCurrentPlanId,
  getPlans,
  (planId, plans = {}) => plans[planId]
);

/**
 * Get all plans as a list
 * @param {object} state
 * @return {object[]} plans as a list
 */
export const listPlans = createSelector(
  getPlans,
  mapToList,
);

/**
 * Get all comments as a list
 */
export const listComments = createSelector(
  getComments,
  mapToList,
);

export const getCurrentSisterProjects = createSelector(
  getCurrentProject,
  getProjects,
  (currentProject, allProjects = []) => allProjects
    .filter(({ projectId }) => isOneOf(projectId, currentProject.sisterProjects))
);

/**
 * Map project to select options
 * @param {object} state
 * @return {object[]}
 */
export const getProjectAsSelectOptions = createSelector(
  getProjects,
  getCurrentProjectId,
  (projects = [], currentProjectId) => projects
    // remove current project from the list
    .filter(p => p.projectId !== Number(currentProjectId))
    // sort options by hansuProjectId
    .sort(propSorter('hansuProjectId'))
    // reverse array to sort ascending
    .reverse()
    // map project to select options
    .map(({ name, projectId, hansuProjectId }) =>
      ({ label: `${hansuProjectId} - ${name}`, value: `${projectId}` }))
);
