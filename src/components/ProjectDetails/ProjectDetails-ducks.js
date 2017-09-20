import { createAction, handleActions } from 'redux-actions';
import { loop, Cmd } from 'redux-loop';
import { push, LOCATION_CHANGED } from 'redux-little-router';
import { fetchProject } from './model';
import { omit } from '../../utils';
import * as ROUTES from '../../constants/routes';

/**
 * Export reducer's name. Will be registerd to
 * the application state with this name
 */
export const NAME = 'projectDetails';

const FETCH_PROJECT_SUCCESS = 'pythia-webclient/ProjectDetails/FETCH_PROJECT_SUCCESS';
const FETCH_PROJECT_ERROR = 'pythia-webclient/ProjectDetails/FETCH_PROJECT_ERROR';

export const actions = {
  // action that's dispatched after project has been
  // successfully fetched from the server
  fetchProjectSuccess: createAction(
    FETCH_PROJECT_SUCCESS,
    project => project
  ),
  // action that's dispatched when project fetch fails
  fetchProjectError: createAction(
    FETCH_PROJECT_ERROR,
    error => error
  ),
};


// ProjectDetails reducer
export default handleActions({
  // react to url change if
  // a) url has project id in it
  // b) project has changed
  [LOCATION_CHANGED]: (state, action) => {
    const { params = {} } = action.payload;
    const { projectId } = params;
    const { project } = state;

    // if navigated to the project details page
    // if there's project id in the url and it's different than previous id
    // then fetch project from the server...
    if (projectId
        && (!project || Number(projectId) !== project.projectId)) {
      return loop(
        // remove error from the state
        state,
        // Middleware will call fetchProject and if it succeeds
        // then fetchProjectSuccess action will be dispatched
        // otherwise fetchProjectError action will be dispatched
        Cmd.run(fetchProject, {
          successActionCreator: actions.fetchProjectSuccess,
          failActionCreator: actions.fetchProjectError,
          // these args are passed to the fetchProject function
          args: [action.payload.params.projectId],
        })
      );
    }
    // ...otherwise return state unmodified
    return state;
  },

  // action that is dispatched after project was successfully fetched from the server
  // add fetched project and remove error from state
  [FETCH_PROJECT_SUCCESS]: (state, action) => ({ ...omit(['error'], state), project: action.payload }),
  // action that is dispatched after project fetching fails for some reason
  // add an error to the state and if fetch fails
  // because resource was not found then redirect to the home page
  [FETCH_PROJECT_ERROR]: (state, action) => {
    const stateWithError = { ...state, error: action.payload };
    return (action.payload.type === 'ResourceNotFoundError')
      ? loop(
        stateWithError,
        Cmd.action(push(ROUTES.NOT_FOUND_PAGE))
      )
      : stateWithError;
  },
}, {});
