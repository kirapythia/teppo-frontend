import { createAction, handleActions } from 'redux-actions';
import { loop, Cmd } from 'redux-loop';
import { push } from 'redux-little-router';
import { saveProject } from './model';
import { omit } from '../../utils';

/**
 * Export reducer's name. Will be registerd to
 * the application state with this name
 */
export const NAME = 'projectForm';

const CREATE_PROJECT = 'pythia-webclient/ProjectForm/CREATE_PROJECT';
const CREATE_PROJECT_SUCCESS = 'pythia-webclient/ProjectForm/CREATE_PROJECT_SUCCESS';
const CREATE_PROJECT_FAIL = 'pythia-webclient/ProjectForm/CREATE_PROJECT_FAIL';
const CLEAR_SEND_ERROR = 'pythia-webclient/ProjectForm/CLEAR_SEND_ERROR';

export const actions = {
  /**
   * Send the newly created project to the server
   * @param {object} formValues Values from the project form
   * @return {object} action object
   */
  saveProject: createAction(
    CREATE_PROJECT,
    formValues => formValues
  ),
  /**
   * Action triggered if the saveProject action succeeds
   * @param {object} project Project object received from the server
   * @return {object} action object
   */
  saveProjectSuccessAction: createAction(
    CREATE_PROJECT_SUCCESS,
    project => project
  ),
  /**
   * Action triggered if the createAction project fails
   * @param {Error} error Error received from the server
   * @return {object} action object
   */
  saveProjectFailAction: createAction(
    CREATE_PROJECT_FAIL,
    err => err
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
  // handle saveProject action
  // return redux loop command like object that will be
  // interpreted by redux-loop middleware
  [CREATE_PROJECT]: (state, action) => loop(
    // remove error from the state
    omit(['error'], state),
    // Middleware will call saveProject and if it succeeds
    // then saveProjectSuccessAction action will be dispatched
    // otherwise saveProjectFailAction action will be dispatched
    Cmd.run(saveProject, {
      successActionCreator: actions.saveProjectSuccessAction,
      failActionCreator: actions.saveProjectFailAction,
      // these args are passed to the saveProject function
      args: [action.payload],
    })
  ),
  // handle saveProject success action
  [CREATE_PROJECT_SUCCESS]: (state, action) => loop(
    // return state unmodified
    state,
    // (middleware will) run (react-little-router's) push action to navigate
    // to the project details page
    Cmd.action(push(`/project/${action.payload.id}`))
  ),
  // handle saveProject fail action
  // just add error to the state
  [CREATE_PROJECT_FAIL]: (state, action) => ({ ...state, error: action.payload }),
  // handle clear send error action
  // just remove error from the state
  [CLEAR_SEND_ERROR]: state => omit(['error'], state),
}, {});
