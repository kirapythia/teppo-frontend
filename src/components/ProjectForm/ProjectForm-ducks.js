import { createAction, handleActions } from 'redux-actions';
import { loop, Cmd } from 'redux-loop';
import { push, LOCATION_CHANGED } from 'redux-little-router';
import * as ROUTES from '../../constants/routes';
import { saveProject, editProject } from './model';
import { identity, isOneOf, omit } from '../../utils';

/**
 * Export reducer's name. Will be registerd to
 * the application state with this name
 */
export const NAME = 'projectForm';

const CREATE_PROJECT = 'pythia-webclient/ProjectForm/CREATE_PROJECT';
const PROJECT_SUCCESS = 'pythia-webclient/ProjectForm/PROJECT_SUCCESS';
const PROJECT_FAIL = 'pythia-webclient/ProjectForm/PROJECT_FAIL';
const CLEAR_SEND_ERROR = 'pythia-webclient/ProjectForm/CLEAR_SEND_ERROR';
const EDIT_PROJECT = 'pythia-webclient/ProjectForm/EDIT_PROJECT';

export const actions = {
  /**
   * Send the newly created project to the server
   * @param {object} formValues Values from the project form
   * @return {object} action object
   */
  saveProject: createAction(
    CREATE_PROJECT,
    identity
  ),
  /**
   * Action triggered if the saveProject action succeeds
   * @param {object} project Project object received from the server
   * @return {object} action object
   */
  projectSuccessAction: createAction(
    PROJECT_SUCCESS,
    identity
  ),
  /**
   * Action triggered if the createAction project fails
   * @param {Error} error Error received from the server
   * @return {object} action object
   */
  projectFailAction: createAction(
    PROJECT_FAIL,
    identity
  ),
  /**
   * Send the newly created project to the server
   * @param {object} formValues Values from the project form
   * @return {object} action object
   */
  editProject: createAction(
    EDIT_PROJECT,
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
    if (state.error && isOneOf(route, [ROUTES.PROJECT, ROUTES.EDIT_PROJECT])) {
      return omit(['error'], state);
    }
    return state;
  },
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
      successActionCreator: actions.projectSuccessAction,
      failActionCreator: actions.projectFailAction,
      // these args are passed to the saveProject function
      args: [action.payload],
    })
  ),
  // handle editProject action
  // return redux loop command like object that will be
  // interpreted by redux-loop middleware
  [EDIT_PROJECT]: (state, action) => loop(
    // remove error from the state
    omit(['error'], state),
    // Middleware will call saveProject and if it succeeds
    // then saveProjectSuccessAction action will be dispatched
    // otherwise saveProjectFailAction action will be dispatched
    Cmd.run(editProject, {
      successActionCreator: actions.projectSuccessAction,
      failActionCreator: actions.projectFailAction,
      // these args are passed to the saveProject function
      args: [action.payload],
    })
  ),
  // handle saveProject success action
  [PROJECT_SUCCESS]: (state, action) => loop(
    // return state unmodified
    state,
    // (middleware will) run (react-little-router's) push action to navigate
    // to the project details page
    Cmd.action(push(`/project/${action.payload.projectId}`))
  ),
  // handle saveProject fail action
  // just add error to the state
  [PROJECT_FAIL]: (state, action) => ({ ...state, error: action.payload }),
  // handle clear send error action
  // just remove error from the state
  [CLEAR_SEND_ERROR]: state => omit(['error'], state),
}, {});
