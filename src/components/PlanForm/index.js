import PlanForm from './PlanForm';
import reducer, { actions, NAME, PLAN_SAVE_SUCCESS } from './PlanForm.ducks';

const actionTypes = {
  PLAN_SAVE_SUCCESS,
};

export { reducer, actions, NAME, actionTypes };
export default PlanForm;
