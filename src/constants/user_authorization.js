import * as Routes from '../constants/routes';

export default {
  createProjectAuthorized: ['ADMIN', 'PLANNER_ADMIN', 'PROJECT_MANAGER', 'PLANNER'],
  editProjectAuthorized: ['ADMIN', 'PLANNER_ADMIN', 'PROJECT_MANAGER', 'PLANNER]'],
  completeProjectAuthorized: ['ADMIN', 'PLANNER_ADMIN'],
  createPlanAuthorized: ['ADMIN', 'PLANNER_ADMIN', 'PROJECT_MANAGER', 'PLANNER'],
  approveDiscardPlanAuthorized: ['ADMIN', 'PLANNER_ADMIN'],
  planCommentsListItemAuthorized: ['ADMIN', 'PLANNER_ADMIN'],
  planMaintenanceApproval: ['MAINTENANCE'],
  [Routes.EDIT_PLAN]: ['ADMIN', 'PLANNER_ADMIN', 'PROJECT_MANAGER', 'PLANNER'],
  [Routes.EDIT_PROJECT]: ['ADMIN', 'PLANNER_ADMIN', 'PROJECT_MANAGER', 'PLANNER'],
};
