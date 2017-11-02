import * as R from 'ramda';
import { createSelector } from 'reselect';
import { propSorter, mapToList, formPlanIdentifier } from '../utils';

/**
 * A collection of selectors that return values from the state. Used mainly
 * in mapStateToProps function when mapping state values to components using
 * react-redux library's connect function
 * @module selectors
 */

const getProjectDetails = state => state.project;
const getPlans = state => state.plans;
const getPlansFromVersionHistory = state => state.planVersionHistory.plans;

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
    .filter(({ projectId }) =>
      R.contains(projectId, R.defaultTo([], currentProject.sisterProjects))
    )
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

/**
 * Get the second latest version of a plan
 * @param {object} state
 * @return {object} Plan object
 */
export const getSecondLatestVersionOfPlan = createSelector(
  getCurrentPlan,
  listPlans,
  (plan, plans) => R.pipe(
    R.filter(R.eqBy(formPlanIdentifier, plan)),
    getNthVersion(R.nth(1))
  )(plans)
);

/**
 * Get all versions of a plan from the version history and sort them by version
 * @param {object} state
 * @return {object[]} A list of plan objects
 */
export const listAllPlanVersions = createSelector(
  getCurrentPlan,
  getPlansFromVersionHistory,
  (plan, allPlans) => R.pipe(
    R.filter(R.eqBy(formPlanIdentifier, plan)),
    R.sortBy(R.prop('version'))
  )(allPlans),
);

/**
 * Get latest version of a plan
 * @param {object} state
 * @return {object} plan entity
 */
export const getLatestPlanVersion = createSelector(
  getCurrentPlan,
  listPlans,
  (plan, plans) => R.pipe(
    R.filter(R.eqBy(formPlanIdentifier, plan)),
    getNthVersion(R.head)
  )(plans)
);
