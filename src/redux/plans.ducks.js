import { combineActions, handleActions } from 'redux-actions';
import { actionTypes as PlanForm } from '../components/PlanForm';
import { actionTypes as ProjectDetails } from '../components/ProjectDetails';

/**
 * Export reducer's name. Will be registerd to
 * the application state with this name
 */
export const NAME = 'plans';

const initialState = {};

const byId = plans => plans.reduce((acc, plan) => ({ ...acc, [plan.planId]: plan }), {});

// ProjectForm reducer
export default handleActions({
  [combineActions(
    PlanForm.PLAN_EDIT_SUCCESS,
    PlanForm.PLAN_SAVE_SUCCESS
  )]: (state, action) =>
    ({ ...state, [action.payload.planId]: action.payload }),
  [ProjectDetails.FETCH_PROJECT_SUCCESS]: (state, action) => byId(action.payload.plans),
}, initialState);
