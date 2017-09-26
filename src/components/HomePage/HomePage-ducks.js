import { createAction, handleActions } from 'redux-actions';
import { loop, Cmd } from 'redux-loop';
import { push, LOCATION_CHANGED } from 'redux-little-router';

import { fetchProjectList } from './model';
import { omit } from '../../utils';
import * as ROUTES from '../../constants/routes';

/**
 * Export reducer's name
 *  Will be registerd to
 * the application state with this name
 * WARNING PROJECTS AND PROJECT_LIST INTERCHANGABLE
 */
export const NAME = 'projectList';

const FETCH_PROJECT_LIST_SUCCESS = 'pythia-webclient/HomePage/FETCH_PROJECT_LIST_SUCCESS';
const FETCH_PROJECT_LIST_ERROR = 'pythia-webclient/ProjectDetails/FETCH_PROJECT_LIST_ERROR';

export const actions = {
  fetchProjectListSuccess: createAction(
    FETCH_PROJECT_LIST_SUCCESS,
    projects => projects
  ),
  fetchProjectListError: createAction(
    FETCH_PROJECT_LIST_ERROR,
    error => error
  ),
};

// ProjectList reducer
export default handleActions({

  [LOCATION_CHANGED]: (state, action) => {
    const currentlocation = action.payload.pathname;
    const { projectList } = state;

    if (!projectList && currentlocation === ROUTES.HOME) {
      return loop(
        state,
        Cmd.run(fetchProjectList, {
          successActionCreator: actions.fetchProjectListSuccess,
          failActionCreator: actions.fetchProjectError,
        })
      );
    }
    return state;
  },
  [FETCH_PROJECT_LIST_SUCCESS]: (state, action) => ({ ...omit(['error'], state), projects: action.payload }),
  [FETCH_PROJECT_LIST_ERROR]: (state, action) => {
    const stateWithError = { ...state, error: action.payload };
    return (action.payload.status === 404)
      ? loop(
        stateWithError,
        Cmd.action(push(ROUTES.NOT_FOUND_PAGE))
      )
      : stateWithError;
  },
}, {});
