import { handleActions } from 'redux-actions';
import { LOCATION_CHANGED } from 'redux-little-router';

export const NAME = 'planDetails';


// PlanDetails reducer
export default handleActions({
  // react to url change if
  // a) url has plan id in it
  // b) plan has changed
  [LOCATION_CHANGED]: (state, action) => {
    const { params = {} } = action.payload;
    const { planId } = params;
    const { plan } = state;

    if (planId && (!!plan || Number(planId) !== plan.planId)) {
      console.log(`####${plan.planId}`);
    }
  },
}, {}
);

