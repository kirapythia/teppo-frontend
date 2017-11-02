import * as Routes from '../constants/routes';

export default {
  createProjectAuthorized: ['ADMIN', 'PLANNER_ADMIN', 'PLANNER'],
  editProjectAuthorized: ['ADMIN', 'PLANNER_ADMIN', 'PLANNER]'],
  completeProjectAuthorized: ['ADMIN', 'PLANNER_ADMIN'],
  createPlanAuthorized: ['ADMIN', 'PLANNER_ADMIN', 'PLANNER'],
  approveDiscardPlanAuthorized: ['ADMIN', 'PLANNER_ADMIN'],
  planCommentsListItemAuthorized: ['ADMIN', 'PLANNER_ADMIN'],
  planMaintenanceApproval: ['MAINTENANCE'],
  [Routes.EDIT_PLAN]: ['ADMIN', 'PLANNER_ADMIN', 'PLANNER'],
  [Routes.EDIT_PROJECT]: ['ADMIN', 'PLANNER_ADMIN', 'PLANNER'],
};
