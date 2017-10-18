import * as R from 'ramda';
import { createAction, handleActions } from 'redux-actions';
import { loop, Cmd } from 'redux-loop';
import { push, LOCATION_CHANGED } from 'redux-little-router';
import { fetchProject, updateProject } from './model';
import * as ROUTES from '../../constants/routes';
import * as ProjectActions from '../../redux/project/project.actions';
import * as ProjectActiontypes from '../../redux/project/project.actiontypes';

/**
 * Export reducer's name. Will be registerd to
 * the application state with this name
 */
export const NAME = 'projectDetails';

export const FETCH_PROJECT_SUCCESS = 'pythia-webclient/ProjectDetails/FETCH_PROJECT_SUCCESS';
const FETCH_PROJECT_ERROR = 'pythia-webclient/ProjectDetails/FETCH_PROJECT_ERROR';
const TOGGE_PROJECT_COMPLETION = 'pythia-webclient/ProjectDetails/TOGGE_PROJECT_COMPLETION';

export const actions = {
  // action that's dispatched after project has been
  // successfully fetched from the server
  fetchProjectSuccess: createAction(
    FETCH_PROJECT_SUCCESS,
  ),
  // action that's dispatched when project fetch fails
  fetchProjectError: createAction(
    FETCH_PROJECT_ERROR,
  ),
  // action for updating project's completed property
  toggleProjectCompletion: createAction(
    TOGGE_PROJECT_COMPLETION,
  ),
};

/**
 * Initial part of the state handled by this reducer
 */
const initialState = {
  isFetching: false,
};

// ProjectDetails reducer
export default handleActions({
  // react to url change if
  // a) url has project id in it
  // b) project has changed
  [LOCATION_CHANGED]: (state, action) => {
    const { params = {} } = action.payload;
    const { projectId } = params;
    const { currentProjectId } = state;

    // if navigated to the project details page
    // if there's project id in the url and it's different than previous id
    // then fetch project from the server...
    if (projectId && (!currentProjectId || projectId !== currentProjectId)) {
      return loop(
        // remove error from the state
        { ...state, isFetching: true, currentProjectId: projectId },
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
  [FETCH_PROJECT_SUCCESS]: state => ({ ...R.omit(['error'], state), isFetching: false }),
  // action that is dispatched after project fetching fails for some reason
  // add an error to the state and if fetch fails
  // because resource was not found then redirect to the home page
  [FETCH_PROJECT_ERROR]: (state, action) => {
    const stateWithError = { ...state, error: action.payload, isFetching: false };
    return (action.payload.status === 404)
      ? loop(
        stateWithError,
        Cmd.action(push(ROUTES.NOT_FOUND_PAGE))
      )
      : stateWithError;
  },
  // toggle project completed property and save updated project to the server
  [TOGGE_PROJECT_COMPLETION]: (state, action) => loop(
    { ...state, isFetching: true },
    Cmd.run(updateProject, {
      successActionCreator: ProjectActions.projectUpdateSuccess,
      failActionCreator: ProjectActions.projectUpdateError,
      args: [{ ...action.payload, completed: !action.payload.completed }],
    })
  ),
  // when update succeeds then set loading false
  [ProjectActiontypes.PROJECT_UPDATE_SUCCESS]: state => ({ ...state, isFetching: false }),
  // when update fails then set loading false and add error to the state
  [ProjectActiontypes.PROJECT_UPDATE_ERROR]: (state, action) =>
    ({ ...state, isFetching: false, error: action.payload }),
}, initialState);
