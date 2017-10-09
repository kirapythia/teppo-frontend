import { Cmd, loop } from 'redux-loop';
import { push } from 'redux-little-router';
import { handleActions } from 'redux-actions';
import { actionTypes } from '../../redux/plans';

export const NAME = 'planDetails';

const initialState = {
  isApproving: false,
};

export default handleActions({
  // Handle approve plan action
  [actionTypes.APPROVE_PLAN]: state => ({ ...state, isApproving: true }),
  // handle approve plan success action
  [actionTypes.APPROVE_PLAN_SUCCESS]: state =>
    ({ ...state, isApproving: false }),
  // handle approve plan error action
  [actionTypes.APPROVE_PLAN_ERROR]: (state, action) =>
    ({ ...state, isApproving: false, error: action.payload }),
  // Handle remove plan action
  [actionTypes.REMOVE_PLAN]: state => ({ ...state, isRemoving: true }),
  // handle approve plan success action
  [actionTypes.REMOVE_PLAN_SUCCESS]: (state, action) => loop(
    { ...state, isRemoving: false },
    Cmd.action(push(`/project/${action.payload.projectId}`)),
  ),
  // handle approve plan error action
  [actionTypes.REMOVE_PLAN_ERROR]: (state, action) =>
    ({ ...state, isRemoving: false, error: action.payload }),
}, initialState);
