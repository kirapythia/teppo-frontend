import { createAction, handleActions } from 'redux-actions';
import { loop, Cmd } from 'redux-loop';
import { push } from 'redux-little-router';
import { savePlan } from './model';
import { getCurrentProjectId } from '../../selectors';

export const NAME = 'planForm';

const SAVE_PLAN = 'pythia-webclient/ProjectForm/SAVE_PLAN';
const SAVE_PLAN_SUCCESS = 'pythia-webclient/ProjectForm/SAVE_PLAN_SUCCESS';
const SAVE_PLAN_FAIL = 'pythia-webclient/ProjectForm/SAVE_PLAN_FAIL';
const CLEAR_SEND_ERROR = 'pythia-webclient/ProjectForm/CLEAR_SEND_ERROR';

export const actions = {
  /**
   * Send a newly created project to the server
   */
  savePlan: createAction(
    SAVE_PLAN,
    formValues => formValues
  ),
  /**
   * Action triggered if the createProject action succeeds
   */
  savePlanSuccessAction: createAction(
    SAVE_PLAN_SUCCESS,
    plan => plan
  ),
  /**
   * Action triggered if the createAction project fails
   */
  savePlanFailAction: createAction(
    SAVE_PLAN_FAIL,
    err => err
  ),
  /**
   * Action triggered when form send error is closed
   */
  clearSendError: createAction(
    CLEAR_SEND_ERROR
  ),
};

// ProjectForm reducer
export default handleActions({
  // handle savePlan action
  [SAVE_PLAN]: (state, action) => loop(
    { ...state, error: null },
    Cmd.run(savePlan, {
      successActionCreator: actions.savePlanSuccessAction,
      failActionCreator: actions.savePlanFailAction,
      args: [action.payload],
    })
  ),
  // handle savePlan success action
  [SAVE_PLAN_SUCCESS]: state => loop(
    state,
    Cmd.action(push(`/project/${getCurrentProjectId(state)}`))
  ),
  // handle savePlan fail action
  [SAVE_PLAN_FAIL]: (state, action) => ({ ...state, error: action.payload }),
  // handle clear send error action
  [CLEAR_SEND_ERROR]: state => ({ ...state, error: null }),
}, {});
