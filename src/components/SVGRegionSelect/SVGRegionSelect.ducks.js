import { createAction, handleActions } from 'redux-actions';
import { LOCATION_CHANGED } from 'redux-little-router';

export const NAME = 'SvgRegions';

export const UPDATE_SVG_STATUS = 'pythia-webclient/PlanComments/UPDATE_SVG_STATUS';
export const ADD_REGION = 'pythia-webclient/PlanComments/ADD_REGION';
export const RESET_REGION = 'pythia-webclient/PlanComments/RESET_REGION';

export const actions = {
  updateSvgStatus: createAction(
    UPDATE_SVG_STATUS
  ),

  addRegion: createAction(
    ADD_REGION
  ),

  resetRegion: createAction(
    RESET_REGION
  ),
};

const initialState = {
  regions: [{ x: 0, y: 0, width: 0, height: 0, data: {} }],
  svgStatus: {
    svgUrl: null,
    svg: null,
    svgWidth: 0,
    svgHeight: 0,
    loading: false,
  },
};

export default handleActions({
  [UPDATE_SVG_STATUS]: (state, action) => ({ ...state, svgStatus: action.payload }),
  [LOCATION_CHANGED]: state => ({ ...state, regions: initialState.regions }),
  [RESET_REGION]: state => ({ ...state, regions: initialState.regions }),
  [ADD_REGION]: (state, action) => {
    switch (action.payload[0].isChanging) {
      case true:
        return { ...state, regions: action.payload };
      default:
        return { ...state };
    }
  },
}, initialState);
