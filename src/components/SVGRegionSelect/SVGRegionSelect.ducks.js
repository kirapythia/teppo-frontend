import { createAction, handleActions } from 'redux-actions';

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
  [LOCATION_CHANGED]: state => ({ ...state, regions: initialState.regions }),
  [SVG_SUCCESS]: (state, action) => {
    switch (action.payload[0].isChanging) {
      case true:
        return { ...state, regions: action.payload };
      default:
        return { ...state };
    }
  },
}, initialState);
