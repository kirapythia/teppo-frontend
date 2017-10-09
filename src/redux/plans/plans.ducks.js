import { createAction, combineActions, handleActions } from 'redux-actions';
import { Cmd, loop } from 'redux-loop';
import { listToMapBy, omit } from '../../utils';
import { removePlan, updatePlan } from './model';
import { actionTypes as PlanForm } from '../../components/PlanForm';
import { actionTypes as ProjectDetails } from '../../components/ProjectDetails';

/**
 * Export reducer's name. Will be registerd to
 * the application state with this name
 */
export const NAME = 'plans';

export const actionTypes = {
  APPROVE_PLAN: 'pythia-webclient/PlanDetails/APPROVE_PLAN',
  APPROVE_PLAN_SUCCESS: 'pythia-webclient/PlanDetails/APPROVE_PLAN_SUCCESS',
  APPROVE_PLAN_ERROR: 'pythia-webclient/PlanDetails/APPROVE_PLAN_ERROR',

  REMOVE_PLAN: 'pythia-webclient/PlanDetails/REMOVE_PLAN',
  REMOVE_PLAN_SUCCESS: 'pythia-webclient/PlanDetails/REMOVE_PLAN_SUCCESS',
  REMOVE_PLAN_ERROR: 'pythia-webclient/PlanDetails/REMOVE_PLAN_ERROR',
};

export const actions = {
  approvePlan: createAction(
    actionTypes.APPROVE_PLAN,
  ),

  approvePlanSuccess: createAction(
    actionTypes.APPROVE_PLAN_SUCCESS
  ),

  approvePlanError: createAction(
    actionTypes.APPROVE_PLAN_ERROR
  ),

  removePlan: createAction(
    actionTypes.REMOVE_PLAN,
  ),

  removePlanSuccess: createAction(
    actionTypes.REMOVE_PLAN_SUCCESS
  ),

  removePlanError: createAction(
    actionTypes.REMOVE_PLAN_ERROR,
  ),
};

/**
 * Create a map of plans with planId as key and plan as value
 * @param {object[]} plans
 * @param {object}
 */
const byId = listToMapBy('planId');

// ProjectForm reducer
export default handleActions({
  // handle plan edit/create success
  [combineActions(
    PlanForm.PLAN_EDIT_SUCCESS,
    PlanForm.PLAN_SAVE_SUCCESS
  )]: (state, action) =>
    ({ ...state, [action.payload.planId]: action.payload }),

  // handle project fetch success
  [ProjectDetails.FETCH_PROJECT_SUCCESS]: (state, action) => byId(action.payload.latestPlans),

  // Handle approve plan action. Update plan object in the server.
  [actionTypes.APPROVE_PLAN]: (state, action) => loop(
    state,
    Cmd.run(updatePlan, {
      successActionCreator: actions.approvePlanSuccess,
      failActionCreator: actions.approvePlanError,
      args: [action.payload],
    })
  ),

  // Handle approve plan success action. Mark corresponding plan as approved
  [actionTypes.APPROVE_PLAN_SUCCESS]: (state, action) => {
    const { planId } = action.payload;
    const plan = state[planId];
    const update = { ...plan, approved: true };
    return { ...state, [planId]: update };
  },

  [actionTypes.REMOVE_PLAN]: (state, action) => loop(
    state,
    Cmd.run(removePlan, {
      successActionCreator: actions.removePlanSuccess,
      failActionCreator: actions.removePlanError,
      args: [action.payload],
    })
  ),

  // Handle approve plan success action. Remove corresponding plan from the plans list
  [actionTypes.REMOVE_PLAN_SUCCESS]: (state, action) =>
    omit([String(action.payload.planId)], state),
}, {});
