export const HOME = '/';
export const PROJECTS = '/projects';
export const PROJECT = '/project/new';
export const EDIT_PROJECT = '/project/:projectId/edit';
export const PROJECT_DETAILS = '/project/:projectId';
export const PLAN = '/project/:projectId/plan/new';
export const EDIT_PLAN = '/project/:projectId/plan/:planId/edit';
export const PLAN_DETAILS = '/project/:projectId/plan/:planId';
export const NOT_FOUND_PAGE = '/404';

/**
 * Route configuration for redux router. Route path as key and config as value
 * @type {object}
 */
export default {
  [HOME]: {},
  [PROJECTS]: {},
  [PROJECT]: {},
  [EDIT_PROJECT]: {},
  [PROJECT_DETAILS]: {},
  [PLAN]: {},
  [EDIT_PLAN]: {},
  [PLAN_DETAILS]: {},
  [NOT_FOUND_PAGE]: {},
};
