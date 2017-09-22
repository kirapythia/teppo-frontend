import { createAction, handleActions } from 'redux-actions';
import { loop, Cmd } from 'redux-loop';
import { push } from 'redux-little-router';
import { savePlan } from './model';
import { actions as NotificationActions } from '../Notifications';
import { tpl } from '../../locale';
import { identity, omit } from '../../utils';

/**
 * Export reducer's name. Will be registerd to
 * the application state with this name
 */
export const NAME = 'planForm';

const SAVE_PLAN = 'pythia-webclient/ProjectForm/SAVE_PLAN';
export const SAVE_PLAN_SUCCESS = 'pythia-webclient/ProjectForm/SAVE_PLAN_SUCCESS';
const SAVE_PLAN_FAIL = 'pythia-webclient/ProjectForm/SAVE_PLAN_FAIL';
const CLEAR_SEND_ERROR = 'pythia-webclient/ProjectForm/CLEAR_SEND_ERROR';

export const actions = {
  /**
   * Send a newly created project to the server
   * @param {object} formValues Values from the plan form
   * @return {object} action object
   */
  savePlan: createAction(
    SAVE_PLAN,
    identity
  ),
  /**
   * Action triggered if the createProject action succeeds
   * @param {object} plan plan object received from the server
   * @return {object}
   */
  savePlanSuccessAction: createAction(
    SAVE_PLAN_SUCCESS,
    identity
  ),
  /**
   * Action triggered if the createAction project fails
   * @param {Error} err
   * @return {object}
   */
  savePlanFailAction: createAction(
    SAVE_PLAN_FAIL,
    identity
  ),
  /**
   * Action triggered when form send error is closed
   * @return {object}
   */
  clearSendError: createAction(
    CLEAR_SEND_ERROR
  ),
};

// ProjectForm reducer
export default handleActions({
  // handle savePlan action
  // return redux loop command like object that will be
  // interpreted by redux-loop middleware
  [SAVE_PLAN]: (state, action) => loop(
    // remove error from the state
    omit(['error'], state),
    // Middleware will call savePlan and if it succeeds
    // then savePlanSuccessAction action will be dispatched
    // otherwise savePlanFailAction action will be dispatched
    Cmd.run(savePlan, {
      successActionCreator: actions.savePlanSuccessAction,
      failActionCreator: actions.savePlanFailAction,
      // these args are passed to the savePlan function
      args: [action.payload],
    })
  ),
  // handle savePlan success action
  [SAVE_PLAN_SUCCESS]: (state, action) => loop(
    // state will not be changed
    state,
    // batch will run multiple actions in parallel
    Cmd.batch([
      // dispatch addSuccessNotification action to display
      // a success notification
      Cmd.action(NotificationActions.addSuccessNotification(
        tpl('plan.message.save_success', action.payload)
      )),
      // dispatch (react-little-router's) push action to navigate
      // to project details page
      Cmd.action(push(`/project/${action.payload.projectId}`)),
    ])
  ),
  // handle savePlan fail action
  // just adds error to the state
  [SAVE_PLAN_FAIL]: (state, action) => ({ ...state, error: action.payload }),
  // handle clear send error action
  // just remove error from the state
  [CLEAR_SEND_ERROR]: state => omit(['error'], state),
}, {});
