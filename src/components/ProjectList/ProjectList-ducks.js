import { createAction, handleActions } from 'redux-actions';
import { loop, Cmd } from 'redux-loop';
import { LOCATION_CHANGED } from 'redux-little-router';

import { fetchProjectList } from './model';
import { isOneOf, omit } from '../../utils';
import { HOME, PROJECT, EDIT_PROJECT, PROJECT_DETAILS } from '../../constants/routes';

/**
 * Export reducer's name
 *  Will be registerd to
 * the application state with this name
 */
export const NAME = 'projectList';

const FETCH_PROJECT_LIST_SUCCESS = 'pythia-webclient/HomePage/FETCH_PROJECT_LIST_SUCCESS';
const FETCH_PROJECT_LIST_ERROR = 'pythia-webclient/HomePage/FETCH_PROJECT_LIST_ERROR';

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

const initialState = {
  isFetching: false,
};

// ProjectList reducer
export default handleActions({
  [LOCATION_CHANGED]: (state, action) => {
    const currentlocation = action.payload.route;

    if (isOneOf(currentlocation, [HOME, PROJECT, EDIT_PROJECT, PROJECT_DETAILS])) {
      return loop(
        { ...state, isFetching: true },
        Cmd.run(fetchProjectList, {
          successActionCreator: actions.fetchProjectListSuccess,
          failActionCreator: actions.fetchProjectListError,
        })
      );
    }
    return state;
  },
  [FETCH_PROJECT_LIST_SUCCESS]: (state, action) =>
    ({ ...omit(['error'], state), projects: action.payload, isFetching: false }),
  [FETCH_PROJECT_LIST_ERROR]: (state, action) =>
    ({ ...state, error: action.payload, isFetching: false }),
}, initialState);
