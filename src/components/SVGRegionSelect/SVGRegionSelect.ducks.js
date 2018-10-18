import { createAction, handleActions } from 'redux-actions';
import * as R from 'ramda';
import { LOCATION_CHANGED } from 'redux-little-router';
import { loop, Cmd } from 'redux-loop';
import { reset } from 'redux-form';
import { listToMapBy } from '../../utils';
import { PLAN_DETAILS } from '../../constants/routes';
import { actionTypes as ProjectDetails } from '../ProjectDetails';

export const NAME = 'SvgRegions';

const SVG_SUCCESS = 'pythia-webclient/PlanComments/SVG_SUCCESS';


export const actions = {
  addRegion: createAction(
    SVG_SUCCESS
  ),
};

const initialState = {
  regions: [{ x: 0, y: 0, width: 0, height: 0, data: {} }],
};

export default handleActions({
  [SVG_SUCCESS]: (state, action) => {
    switch (action.payload[0].isChanging) {
      case true:
        return { ...state, regions: action.payload };
      default:
        return { ...state };
    }
  },
}, initialState);
