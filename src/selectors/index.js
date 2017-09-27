import { createSelector } from 'reselect';

/**
 * A collection of selectors that return values from the state. Used mainly
 * in mapStateToProps function when mapping state values to components using
 * react-redux library's connect function
 * @module selectors
 */

const getProjectDetails = state => (state.projectDetails || {}).project;

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
  getCurrentProject,
  (planId, project) => planId
    && project
    && project.plans.find(plan => plan.planId === +planId)
);
