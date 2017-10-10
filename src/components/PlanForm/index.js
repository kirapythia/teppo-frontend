import PlanForm from './PlanForm';
import reducer, { actions, NAME, PLAN_SAVE_SUCCESS, PLAN_EDIT_SUCCESS } from './PlanForm.ducks';

const actionTypes = {
  PLAN_SAVE_SUCCESS,
  PLAN_EDIT_SUCCESS,
};

export { reducer, actions, NAME, actionTypes };
export default PlanForm;
