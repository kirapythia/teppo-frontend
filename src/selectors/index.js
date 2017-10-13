import * as R from 'ramda';
import { createSelector } from 'reselect';
import { isOneOf, propSorter, mapToList, concatProps } from '../utils';

/**
 * A collection of selectors that return values from the state. Used mainly
 * in mapStateToProps function when mapping state values to components using
 * react-redux library's connect function
 * @module selectors
 */

const getProjectDetails = state => state.project;
const getPlans = state => state.plans;

/**
 * Get all projects as a list
 * @param {object} state
 * @return {object[]}
 */
export const getProjects = state => state.projectList.projects;

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
 * Get all sister projects of the current project
 * @param {object} state
 * @return {object[]} a list of projects
 */
export const getCurrentSisterProjects = createSelector(
  getCurrentProject,
  getProjects,
  (currentProject = {}, allProjects = []) => allProjects
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

/**
 * Form a identifier by concatenating projectId, mainNo and subNo
 * @private
 * @param {object} plan
 * @return {function} A function that returns a string when applied on a plan object
 */
const formPlanIdentifier = concatProps(['projectId', 'mainNo', 'subNo']);

/**
 * Sort plans descending by version number and take the first entry
 * @private
 * @param {object[]} plans
 * @return {function} A function that returns a plan object when applied on a list of plans
 */
const getNthVersion = takeNth => R.pipe(R.sortBy(R.prop('version')), R.reverse, takeNth);

/**
 * Get latest versions of project's plans
 * @param {object} state
 * @return {object[]} An array of plans
 */
export const listLatestVersionsOfPlans = createSelector(
  listPlans,
  R.pipe(
    R.groupBy(formPlanIdentifier),
    R.mapObjIndexed(getNthVersion(R.head)),
    R.values,
  )
);

export const getSecondLatestVersionOfPlan = createSelector(
  getCurrentPlan,
  listPlans,
  (plan, plans) => R.pipe(
    R.filter(R.eqBy(formPlanIdentifier, plan)),
    getNthVersion(R.nth(1))
  )(plans)
);
