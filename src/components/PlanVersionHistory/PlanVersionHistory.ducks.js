import * as R from 'ramda';
import { Cmd, loop } from 'redux-loop';
import { createAction, handleActions } from 'redux-actions';
import { LOCATION_CHANGED } from 'redux-little-router';
import { fetchPlanHistory } from './model';
import { PLAN_DETAILS } from '../../constants/routes';

export const NAME = 'planVersionHistory';

const FETCH_PLAN_HISTORY = 'pythia-webclient/ProjectDetails/FETCH_PLAN_HISTORY';
const FETCH_PLAN_HISTORY_ERROR = 'pythia-webclient/ProjectDetails/FETCH_PLAN_HISTORY_ERROR';
const TOGGLE_PLAN_HISTORY = 'pythia-webclient/ProjectDetails/TOGGLE_PLAN_HISTORY';

export const actionTypes = {
  FETCH_PLAN_HISTORY_SUCCESS: 'pythia-webclient/ProjectDetails/FETCH_PLAN_HISTORY_SUCCESS',
};

export const actions = {
  /**
   * Start plan history fetching
   * @param {object} plan
   * @return {object} action object
   */
  fetchPlanHistory: createAction(
    FETCH_PLAN_HISTORY,
  ),
  /**
   * History fetch success
   * @param {object} project
   * @return {object} action object
   */
  fetchPlanHistorySuccess: createAction(
    actionTypes.FETCH_PLAN_HISTORY_SUCCESS,
  ),
  /**
   * History fetch error
   * @param {Error} error
   * @return {object} action object
   */
  fetchPlanHistoryError: createAction(
    FETCH_PLAN_HISTORY_ERROR,
  ),
  /**
   * Show/hide plan history section
   * @param {object} plan
   * @return {object} action object
   */
  togglePlanHistory: createAction(
    TOGGLE_PLAN_HISTORY,
  ),
};

const initialState = {
  isFetching: false,
  isToggled: false,
  plans: [],
};

export default handleActions({
  // reset state when route initialized
  [LOCATION_CHANGED]: (state, action) =>
    (action.payload.route === PLAN_DETAILS ? { ...initialState } : state),
  // fetch a project with full plan version history
  [FETCH_PLAN_HISTORY]: (state, action) => loop(
    { ...state, isFetching: true, plans: [] },
    Cmd.run(fetchPlanHistory, {
      successActionCreator: actions.fetchPlanHistorySuccess,
      failActionCreator: actions.fetchPlanHistoryError,
      args: [action.payload],
    })
  ),
  // plan history fetch success handler
  [actionTypes.FETCH_PLAN_HISTORY_SUCCESS]: (state, action) =>
    ({
      ...R.omit(['error'], state),
      isFetching: false,
      plans: action.payload.plans,
    }),
  // plan history fetch error handler
  [FETCH_PLAN_HISTORY_ERROR]: (state, action) =>
    ({ ...state, error: action.payload, isFetching: false }),
  // toggle plan history visible or hidden
  // load project with full plan version history when toggling state to true
  [TOGGLE_PLAN_HISTORY]: (state, action) => {
    const toggleState = !state.isToggled;
    const updatedState = { ...state, isToggled: toggleState };

    return toggleState
      ? loop(updatedState, Cmd.action(actions.fetchPlanHistory(action.payload)))
      : updatedState;
  },
}, initialState);
