import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from './SVGRegionSelect.ducks';
import { getCurrentPlan, getCurrentProject } from '../../selectors';
import SVGInline from 'react-svg-inline';
import RegionSelect from 'react-region-select';

import RegionSelectArea from './RegionSelectArea';

import iconSVG from '../common/200100102.svg';
import style from './SVGRegionSelect.css';


/* eslint import/no-webpack-loader-syntax: off */
/* Select needed props from the global state
 * @param {object} state
 * @return {object} props
 */


const mapStateToProps = (state) => {
  const plan = getCurrentPlan(state);
  const svgregions = state.regions;
  return {
    plan,
    svgregions,
    user: state.user.user,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  addComment: actions.addComment,
  regions: actions.addregion,
  toggleCommentApproval: actions.toggleCommentApproval,
  clearCommentAddError: actions.clearCommentAddError,
  clearCommentEditError: actions.clearCommentEditError,
}, dispatch);

/**
 * Merge state props and action creators
 * @param {object} stateProps
 * @param {object} actionCreators
 * @return {object} props passed to PlanCommentsSection component
 */
const mergeProps = (stateProps, actionCreators) => ({
  ...stateProps,
  ...actionCreators,
  areaOnChange: comment =>
    actionCreators.areaOnChange(stateProps.plan, comment),
});

/*
class SVGRegionSelect extends Component {
  constructor(props) {
    super(props);
    this.regionRenderer = this.regionRenderer.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      get regions() {
        return this._regions;
      },
      set regions(value) {
        this._regions = value;
      },
    };
  }
  onChange(regions) {
    this.setState({
      regions,
    });
  }
  changeRegionData(index, event) {
    const region = this.state.regions[index];
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
    this.onChange([
      ...this.state.regions.slice(0, index),
      objectAssign({}, region, {
        data: objectAssign({}, region.data, { dataType: event.target.value }),
      }),
      ...this.state.regions.slice(index + 1),
    ]);
  }
  regionRenderer(regionProps) {
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
  }
  render() {
    const regionStyle = {
      background: 'rgba(255, 0, 0, 0.5)',
    };

    */

const SVGRegionSelect = ({
  plan,
  comments,
  svgregions,

}) => (

  <div style={{ display: 'grid' }}>
    <RegionSelectArea
      maxRegions={1}
      regions={this.state.svgregions}
           // regionStyle={regionStyle}
      constraint
      debug
      onChange={this.onChange}
      regionRenderer={this.regionRenderer}
      style={{ border: '1px solid #0FA0CE' }}
    >
      <SVGInline
          viewBox="0 0 3000 2000"
          svg={iconSVG}
          component="svg"
        />
    </RegionSelectArea>
  </div>

);


export default connect(mapStateToProps, mergeProps)(SVGRegionSelect);
