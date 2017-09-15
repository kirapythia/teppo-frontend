import { createAction, handleActions } from 'redux-actions';
import { loop, Cmd } from 'redux-loop';
import { LOCATION_CHANGED } from 'redux-little-router';
import { fetchProject } from './model';

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
    const { projectId } = action.payload.params;
    const { project } = state;

    // if there's project id in the url and it's different than previous id
    // then fetch project from the server...
    if (projectId && (!project || Number(projectId) !== project.projectId)) {
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
  [FETCH_PROJECT_SUCCESS]: (state, action) => ({ ...state, project: action.payload }),

  // TODO: add FETCH_PROJECT_ERROR handler
}, {});
