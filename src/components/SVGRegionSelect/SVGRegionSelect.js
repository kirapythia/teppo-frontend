import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from './SVGRegionSelect.ducks';
import { getCurrentPlan, getCurrentProject } from '../../selectors';
import objectAssign from 'object-assign';
import SVGInline from 'react-svg-inline';
import iconSVG from '../common/200100102.svg';
import RegionSelect from 'react-region-select';
import { notStrictEqual } from 'assert';

import RegionSelectArea from './RegionSelectArea';

import style from './SVGRegionSelect.css';

const mapStateToProps = (state) => {
  const plan = getCurrentPlan(state);
  const svgregions = state.SvgRegions.regions;

  return {
    plan,
    svgregions,
    user: state.user.user,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  addRegion: actions.addRegion,
}, dispatch);

const mergeProps = (stateProps, actionCreators) => ({
  ...stateProps,
  ...actionCreators,
});

const changeRegionData = (index, event) => {
  const region = this.state.SvgRegions[index];
  let color;
  switch (event.target.value) {
    case '1':
      color = 'rgba(0, 255, 0, 0.5)';
      break;
    case '2':
      color = 'rgba(0, 0, 255, 0.5)';
      break;
    case '3':
      color = 'rgba(255, 0, 0, 0.5)';
      break;
    default:
      color = 'rgba(0, 0, 0, 0.5)';
  }

  region.data.regionStyle = {
    background: color,
  };
  /*
  onChange([
    ...this.state.regions.slice(0, index),
    objectAssign({}, region, {
      data: objectAssign({}, region.data, { dataType: event.target.value }),
    }),
    ...this.state.regions.slice(index + 1),
  ]);
  */
};

const regionRenderer = (regionProps) => {
  if (!regionProps.isChanging) {
    return (
      <div style={{ position: 'absolute', right: 0, bottom: '-1.5em' }}>
        <select
          onChange={event => this.changeRegionData(regionProps.index, event)}
          value={regionProps.data.dataType}
        >
          <option value="1">Green</option>
          <option value="2">Blue</option>
          <option value="3">Red</option>
        </select>
      </div>
    );
  }
};

const regionStyle = {
  background: 'rgba(255, 0, 0, 0.5)',
};


const SVGRegionSelect = ({
  plan,
  comment,
  svgregions,
  addRegion,
  onChange,

}) => (

  <div style={{ display: 'grid' }}>
    <RegionSelect
      maxRegions={1}
      regions={svgregions}
      debug
      onChange={addRegion}
      regionStyle={regionStyle}
      regionRenderer={regionRenderer}
      style={{ border: '1px solid #0FA0CE' }}
    >
      <SVGInline
        viewBox="0 0 3000 2000"
        svg={iconSVG}
        component="svg"
      />
    </RegionSelect>
  </div>
);


export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SVGRegionSelect);


/*


<RegionSelect
svgurl={plan.svgUrl}
regions={svgregions.regions}
comment={comment}
onChange={addRegion}
/>
<SVGInline
viewBox="0 0 3000 2000"
svg={iconSVG}
component="svg"
/>
</RegionSelect>
*/
