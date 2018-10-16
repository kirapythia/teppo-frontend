import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from './SVGRegionSelect.ducks';
import { getCurrentPlan, getCurrentProject } from '../../selectors';

import RegionSelectArea from './RegionSelectArea';

import style from './SVGRegionSelect.css';

const mapStateToProps = state => {
  const plan = getCurrentPlan(state);
  const svgregions = state.SvgRegions.regions;

  return {
    plan,
    svgregions,
    user: state.user.user,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  addRegion: actions.addRegion
}, dispatch);

const mergeProps = (stateProps, actionCreators) => ({
  ...stateProps,
  ...actionCreators
});


const SVGRegionSelect = ({
  plan,
  comment,
  svgregions,
  addRegion
}) => (

  <div style={{ display: 'grid' }}>
    <RegionSelectArea
      svgurl={plan.svgUrl}
      regions={svgregions.regions}
      comment={comment}
      onChange={addRegion}
    />
  </div>

);


export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SVGRegionSelect);
