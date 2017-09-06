import { loop, Cmd } from 'redux-loop';
import { push } from 'redux-little-router';
import { createAction, handleActions } from 'redux-actions';

export const NAME = 'projectForm';

const CREATE_PROJECT = 'pythia-webclient/ProjectForm/CREATE_PROJECT';
const CREATE_PROJECT_SUCCESS = 'pythia-webclient/ProjectForm/CREATE_PROJECT_SUCCESS';
const CREATE_PROJECT_FAIL = 'pythia-webclient/ProjectForm/CREATE_PROJECT_FAIL';

// FIXME: move this to a separate utility file when implemented
const saveProject = values => new Promise(resolve => resolve({ ...values, id: '123' }));

export const actions = {
  /**
   * Send a newly created project to the server
   */
  createProject: createAction(
    CREATE_PROJECT,
    formValues => formValues
  ),
  /**
   * Action triggered if the createProject action succeeds
   */
  saveProjectSuccessAction: createAction(
    CREATE_PROJECT_SUCCESS,
    project => project
  ),
  /**
   * Action triggered if the createAction project fails
   */
  saveProjectFailAction: createAction(
    CREATE_PROJECT_FAIL,
    err => err
  ),
};

export default handleActions({
  [CREATE_PROJECT]: (state, action) => loop(
    state,
    Cmd.run(saveProject, {
      successActionCreator: actions.saveProjectSuccessAction,
      failActionCreator: actions.saveProjectFailAction,
      args: [action.payload],
    })
  ),
  [CREATE_PROJECT_SUCCESS]: (state, action) => loop(
    state,
    Cmd.action(push(`/project/${action.payload.id}`))
  ),
  [CREATE_PROJECT_FAIL]: (state, action) => ({ ...state, error: action.payload }),
}, {});
