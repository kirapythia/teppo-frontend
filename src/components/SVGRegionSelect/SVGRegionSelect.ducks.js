import { createAction, handleActions } from 'redux-actions';
import * as R from 'ramda';
import { LOCATION_CHANGED } from 'redux-little-router';
import { loop, Cmd } from 'redux-loop';
import { reset } from 'redux-form';
import { listToMapBy } from '../../utils';
import { PLAN_DETAILS } from '../../constants/routes';
import { actionTypes as ProjectDetails } from '../ProjectDetails';

export const NAME = 'svgregions';

const SVG_SUCCESS = 'pythia-webclient/PlanComments/SVG_SUCCESS';


export const actions = {
  addregion: createAction(
    SVG_SUCCESS
  ),
};

const initialState = {
  regions: [],
};

const byId = listToMapBy('ptextId');

const listAllComments = R.pipe(
  R.prop('plans'),
  R.pluck('commentValues'),
  R.flatten,
  R.filter(Boolean),
);

export default handleActions({
 
  [ProjectDetails.FETCH_PROJECT_SUCCESSA]: (state, action) =>
    ({ ...state, comments: byId(listAllComments(action.payload)), regions: [] }),
  // handle add comment action


  [SVG_SUCCESS]: state => R.omit(['commentEditError'], state),
}, initialState);
