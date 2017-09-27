import { createAction, handleActions } from 'redux-actions';
import { loop, Cmd } from 'redux-loop';
import { push, LOCATION_CHANGED } from 'redux-little-router';
import { editPlan, savePlan } from './model';
import { actions as NotificationActions } from '../Notifications';
import { tpl } from '../../locale';
import { identity, isOneOf, omit } from '../../utils';
import * as ROUTES from '../../constants/routes';

/**
 * Export reducer's name. Will be registerd to
 * the application state with this name
 */
export const NAME = 'planForm';

const SAVE_PLAN = 'pythia-webclient/ProjectForm/SAVE_PLAN';
const EDIT_PLAN = 'pythia-webclient/ProjectForm/EDIT_PLAN';
export const PLAN_SAVE_SUCCESS = 'pythia-webclient/ProjectForm/PLAN_SAVE_SUCCESS';
export const PLAN_EDIT_SUCCESS = 'pythia-webclient/ProjectForm/PLAN_EDIT_SUCCESS';
const PLAN_FAIL = 'pythia-webclient/ProjectForm/PLAN_FAIL';
const CLEAR_SEND_ERROR = 'pythia-webclient/ProjectForm/CLEAR_SEND_ERROR';

export const actions = {
  /**
   * Send a newly created plan to the server
   * @param {object} formValues Values from the plan form
   * @return {object} action object
   */
  savePlan: createAction(
    SAVE_PLAN,
    identity
  ),
  /**
   * Send a edited plan to the server
   * @param {object} formValues Values from the plan form
   * @return {object} action object
   */
  editPlan: createAction(
    EDIT_PLAN,
    identity
  ),
  /**
   * Action triggered if the createProject action succeeds
   * @param {object} plan plan object received from the server
   * @return {object}
   */
  planSaveSuccessAction: createAction(
    PLAN_SAVE_SUCCESS,
    identity
  ),
  /**
   * Action triggered if the createProject action succeeds
   * @param {object} plan plan object received from the server
   * @return {object}
   */
  planEditSuccessAction: createAction(
    PLAN_EDIT_SUCCESS,
    identity
  ),
  /**
   * Action triggered if the createAction project fails
   * @param {Error} err
   * @return {object}
   */
  planFailAction: createAction(
    PLAN_FAIL,
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
  [LOCATION_CHANGED]: (state, action) => {
    const { route } = action.payload;
    // clear error when entering the form
    if (state.error && isOneOf(route, [ROUTES.PLAN, ROUTES.EDIT_PLAN])) {
      return omit(['error'], state);
    }
    return state;
  },
  // handle savePlan action
  // return redux loop command like object that will be
  // interpreted by redux-loop middleware
  [SAVE_PLAN]: (state, action) => loop(
    // remove error from the state
    omit(['error'], state),
    // Middleware will call savePlan and if it succeeds
    // then planSuccessAction action will be dispatched
    // otherwise planFailAction action will be dispatched
    Cmd.run(savePlan, {
      successActionCreator: actions.planSaveSuccessAction,
      failActionCreator: actions.planFailAction,
      // these args are passed to the savePlan function
      args: [action.payload],
    })
  ),
  // handle savePlan action
  // return redux loop command like object that will be
  // interpreted by redux-loop middleware
  [EDIT_PLAN]: (state, action) => loop(
    // remove error from the state
    omit(['error'], state),
    // Middleware will call savePlan and if it succeeds
    // then planSuccessAction action will be dispatched
    // otherwise planFailAction action will be dispatched
    Cmd.run(editPlan, {
      successActionCreator: actions.planEditSuccessAction,
      failActionCreator: actions.planFailAction,
      // these args are passed to the savePlan function
      args: [action.payload],
    })
  ),
  // handle savePlan success action
  [PLAN_SAVE_SUCCESS]: (state, action) => loop(
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
  // handle savePlan success action
  [PLAN_EDIT_SUCCESS]: (state, action) => loop(
    // state will not be changed
    state,
    // batch will run multiple actions in parallel
    Cmd.batch([
      // dispatch addSuccessNotification action to display
      // a success notification
      Cmd.action(NotificationActions.addSuccessNotification(
        tpl('plan.message.edit_success', action.payload)
      )),
      // dispatch (react-little-router's) push action to navigate
      // to project details page
      Cmd.action(push(`/project/${action.payload.projectId}`)),
    ])
  ),
  // handle savePlan fail action
  // just adds error to the state
  [PLAN_FAIL]: (state, action) => ({ ...state, error: action.payload }),
  // handle clear send error action
  // just remove error from the state
  [CLEAR_SEND_ERROR]: state => omit(['error'], state),
}, {});
