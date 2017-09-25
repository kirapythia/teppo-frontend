export const HOME = '/';
export const PROJECT = '/project/new';
export const EDIT_PROJECT = '/project/:projectId/edit';
export const PROJECT_DETAILS = '/project/:projectId';
export const PLAN = '/project/:projectId/plan/new';
export const EDIT_PLAN = '/project/:projectId/plan/:planId';
export const NOT_FOUND_PAGE = '/404';

/**
 * Route configuration for redux router. Route path as key and config as value
 * @type {object}
 */
export default {
  [HOME]: {},
  [PROJECT]: {},
  [EDIT_PROJECT]: {},
  [PROJECT_DETAILS]: {},
  [PLAN]: {},
  [EDIT_PLAN]: {},
  [NOT_FOUND_PAGE]: {},
};
