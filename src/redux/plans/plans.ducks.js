import { identity } from 'ramda';
import { createAction, combineActions, handleActions } from 'redux-actions';
import { Cmd, loop } from 'redux-loop';
import { mapToList, listToMapBy, pick, omit } from '../../utils';
import { createPlan, removePlan, updatePlan } from './model';
import { actionTypes as PlanForm } from '../../components/PlanForm';
import { actionTypes as ProjectDetails } from '../../components/ProjectDetails';

/**
 * Export reducer's name. Will be registerd to
 * the application state with this name
 */
export const NAME = 'plans';

export const actionTypes = {
  APPROVE_PLAN: 'pythia-webclient/PlanDetails/APPROVE_PLAN',

  UPDATE_PLAN_SUCCESS: 'pythia-webclient/PlanDetails/UPDATE_PLAN_SUCCESS',
  UPDATE_PLAN_ERROR: 'pythia-webclient/PlanDetails/UPDATE_PLAN_ERROR',

  REMOVE_PLAN: 'pythia-webclient/PlanDetails/REMOVE_PLAN',
  REMOVE_PLAN_SUCCESS: 'pythia-webclient/PlanDetails/REMOVE_PLAN_SUCCESS',
  REMOVE_PLAN_ERROR: 'pythia-webclient/PlanDetails/REMOVE_PLAN_ERROR',

  CREATE_NEW_PLAN_VERSION: 'pythia-webclient/PlanDetails/CREATE_NEW_PLAN_VERSION',
};

export const actions = {
  approvePlan: createAction(
    actionTypes.APPROVE_PLAN,
  ),

  updatePlanSuccess: createAction(
    actionTypes.UPDATE_PLAN_SUCCESS,
  ),

  updatePlanError: createAction(
    actionTypes.UPDATE_PLAN_ERROR,
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

  createNewPlanVersion: createAction(
    actionTypes.CREATE_NEW_PLAN_VERSION,
  ),

  createNewPlanVersionSuccess: createAction(
    actionTypes.UPDATE_PLAN_SUCCESS,
    identity,
    () => ({ origin: actionTypes.CREATE_NEW_PLAN_VERSION }),
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
  // Handle approve plan action. Update plan object in the server.
  [actionTypes.APPROVE_PLAN]: (state, action) => loop(
    state,
    Cmd.run(updatePlan, {
      successActionCreator: actions.updatePlanSuccess,
      failActionCreator: actions.updatePlanError,
      args: [{ ...action.payload, approved: true }],
    })
  ),

  // Handle remove plan action. Remove the plan from the server.
  [actionTypes.REMOVE_PLAN]: (state, action) => loop(
    state,
    Cmd.run(removePlan, {
      successActionCreator: actions.removePlanSuccess,
      failActionCreator: actions.removePlanError,
      args: [action.payload],
    })
  ),

  // Handle create new plan version action. Send selected plan to the server to
  // create a new plan entity with copied values from the old plan
  [actionTypes.CREATE_NEW_PLAN_VERSION]: (state, action) => loop(
    state,
    Cmd.run(createPlan, {
      successActionCreator: actions.createNewPlanVersionSuccess,
      failActionCreator: actions.updatePlanError,
      args: [pick(['projectId', 'mainNo', 'subNo'], action.payload)],
    })
  ),

  // handle plan edit/create success
  // and new plan version creation
  [combineActions(
    PlanForm.PLAN_EDIT_SUCCESS,
    PlanForm.PLAN_SAVE_SUCCESS,
    actionTypes.UPDATE_PLAN_SUCCESS,
  )]: (state, action) => byId(mapToList(state).concat(action.payload)),

  // handle project fetch success
  [ProjectDetails.FETCH_PROJECT_SUCCESS]: (state, action) => byId(action.payload.latestPlans),

  // Handle approve plan success action. Remove corresponding plan from the plans list
  [actionTypes.REMOVE_PLAN_SUCCESS]: (state, action) =>
    omit([String(action.payload.planId)], state),
}, {});
