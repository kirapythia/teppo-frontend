import { createAction, handleActions } from 'redux-actions';
import { LOCATION_CHANGED } from 'redux-little-router';

export const NAME = 'SvgRegions';

export const SVG_SUCCESS = 'pythia-webclient/PlanComments/SVG_SUCCESS';
export const RESET_REGION = 'pythia-webclient/PlanComments/RESET_REGION';

export const actions = {
  addRegion: createAction(
    SVG_SUCCESS
  ),

  resetRegion: createAction(
    RESET_REGION
  ),
};

const initialState = {
  regions: [{ x: 0, y: 0, width: 0, height: 0, data: {} }],
};

export default handleActions({
  [LOCATION_CHANGED]: state => ({ ...state, regions: initialState.regions }),
  [RESET_REGION]: state => ({ ...state, regions: initialState.regions }),
  [SVG_SUCCESS]: (state, action) => {
    switch (action.payload[0].isChanging) {
      case true:
        return { ...state, regions: action.payload };
      default:
        return { ...state };
    }
  },
}, initialState);
