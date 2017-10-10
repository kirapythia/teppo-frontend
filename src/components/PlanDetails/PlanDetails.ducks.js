import { Cmd, loop } from 'redux-loop';
import { pathEq, pick } from 'ramda';
import { push } from 'redux-little-router';
import { combineActions, handleActions } from 'redux-actions';
import { tpl } from '../../locale';
import { actionTypes } from '../../redux/plans';
import { actions as Notifications } from '../Notifications';

export const NAME = 'planDetails';

const initialState = {
  isFetching: false,
};

export default handleActions({
  // Handle actions that initiate a fetch request
  [combineActions(
    actionTypes.APPROVE_PLAN,
    actionTypes.REMOVE_PLAN,
    actionTypes.CREATE_NEW_PLAN_VERSION,
  )]: state => ({ ...state, isFetching: true }),

  // handle approve plan success action
  [actionTypes.UPDATE_PLAN_SUCCESS]: (state, action) => {
    const message = tpl('plan.message.update_success', pick(['mainNo', 'subNo'], action.payload));
    // display a success notification
    const actions = [Cmd.action(Notifications.addSuccessNotification(message))]
      // if action has origin meta field and it equals create new version actiontype then
      // navigate to next page otherwise just display the notification
      .concat(pathEq(['meta', 'origin'], actionTypes.CREATE_NEW_PLAN_VERSION)(action)
        ? Cmd.action(push(`/project/${action.payload.projectId}/plan/${action.payload.planId}`))
        : []);

    return loop(({ ...state, isFetching: false }), Cmd.list(actions));
  },

  // handle approve plan success action
  [actionTypes.REMOVE_PLAN_SUCCESS]: (state, action) => loop(
    { ...state, isFetching: false },
    // navigate to project page
    Cmd.action(push(`/project/${action.payload.projectId}`)),
  ),

  // handle errors
  [combineActions(
    actionTypes.UPDATE_PLAN_ERROR,
    actionTypes.REMOVE_PLAN_ERROR,
  )]: (state, action) =>
    ({ ...state, isFetching: false, error: action.payload }),
}, initialState);
