import * as R from 'ramda';
import { combineActions, createAction, handleActions } from 'redux-actions';
import { loop, Cmd } from 'redux-loop';
import { push, LOCATION_CHANGED } from 'redux-little-router';
import { savePlans } from './model';
import { actions as NotificationActions } from '../Notifications';
import { tpl } from '../../locale';
import * as ROUTES from '../../constants/routes';
import { formProjectUrl } from '../../utils';

/**
 * Export reducer's name. Will be registerd to
 * the application state with this name
 */
export const NAME = 'planForm';

const SAVE_PLAN = 'pythia-webclient/ProjectForm/SAVE_PLAN';
const VERSION_PLAN = 'pythia-webclient/ProjectForm/VERSION_PLAN';
export const PLAN_SAVE_SUCCESS = 'pythia-webclient/ProjectForm/PLAN_SAVE_SUCCESS';
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
  ),

  /**
   * Create a new version of a plan
   * @param {object} formValues
   * @return {object} action object
   */
  versionPlan: createAction(
    VERSION_PLAN
  ),
  /**
   * Action triggered if the createProject action succeeds
   * @param {object} plan plan object received from the server
   * @return {object}
   */
  planSaveSuccessAction: createAction(
    PLAN_SAVE_SUCCESS,
    value => [].concat(value),
  ),
  /**
   * Action triggered if the createAction project fails
   * @param {Error} err
   * @return {object}
   */
  planFailAction: createAction(
    PLAN_FAIL,
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
    if (state.error && R.contains(route, [ROUTES.PLAN, ROUTES.EDIT_PLAN])) {
      return R.omit(['error'], state);
    }
    return state;
  },
  // handle savePlan and versionPlan actions
  // return redux loop command like object that will be
  // interpreted by redux-loop middleware
  [combineActions(
    SAVE_PLAN,
    VERSION_PLAN,
  )]: (state, action) => loop(
    // remove error from the state
    R.omit(['error'], state),
    // Middleware will call savePlan and if it succeeds
    // then planSuccessAction action will be dispatched
    // otherwise planFailAction action will be dispatched
    Cmd.run(savePlans, {
      successActionCreator: actions.planSaveSuccessAction,
      failActionCreator: actions.planFailAction,
      // these args are passed to the savePlan function
      args: [action.payload, action.type === VERSION_PLAN],
    })
  ),
  // handle savePlan success action
  [PLAN_SAVE_SUCCESS]: (state, action) => {
    const [succeeded, failed] = action.payload;
    const effects = [
      // dispatch addSuccessNotification action to display a success notification
      NotificationActions.addSuccessNotification(
        succeeded.length > 1
          ? tpl('plan.message.save_success_multiple', { count: succeeded.length })
          : tpl('plan.message.save_success', { ...succeeded[0] })
      ),
      // dispatch (react-little-router's) push action to navigate
      // to project details page
      push(formProjectUrl(succeeded[0].projectId)),
    ];

    if (failed.length) {
      effects.push(NotificationActions.addErrorNotification(
        action.payload.length > 1
          ? tpl('plan.message.save_error_multiple', { count: failed })
          : tpl('plan.message.save_error', { filename: failed[0] })
      ));
    }

    return loop(
      // state will not be changed
      state,
      // batch will run multiple actions in parallel
      Cmd.list(effects.map(effect => Cmd.action(effect)))
    );
  },
  // handle savePlan fail action
  // just adds error to the state
  [PLAN_FAIL]: (state, action) => ({ ...state, error: action.payload }),
  // handle clear send error action
  // just remove error from the state
  [CLEAR_SEND_ERROR]: state => R.omit(['error'], state),
}, {});
