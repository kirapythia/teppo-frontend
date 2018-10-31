import React from 'react';
import RegionSelect from 'react-region-select';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from './SVGRegionSelect.ducks';
import { getCurrentPlan } from '../../selectors';
import SVGRenderer from './SVGRenderer';

const mapStateToProps = (state) => {
  const plan = getCurrentPlan(state);
  const selectedComment = state.comments.selected;
  const svgregions = (!selectedComment || !selectedComment.comment)
    ? state.SvgRegions.regions
    : [{
      x: selectedComment.comment.x,
      y: selectedComment.comment.y,
      width: selectedComment.comment.width,
      height: selectedComment.comment.height,
      data: {},
    }];

  return {
    plan,
    svgStatus: state.SvgRegions.svgStatus,
    svgregions,
    selectedComment,
    user: state.user.user,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  updateSvgStatus: actions.updateSvgStatus,
  addRegion: actions.addRegion,
  resetRegion: actions.resetRegion,
}, dispatch);

const mergeProps = (stateProps, actionCreators) => ({
  ...stateProps,
  ...actionCreators,
});

const regionStyle = {
  background: 'rgba(255, 0, 0, 0.5)',
};

const SVGRegionSelect = ({
  plan,
  svgStatus,
  updateSvgStatus,
  svgregions,
  addRegion,
}) => (
  <div style={{ display: 'grid' }}>
    <RegionSelect
      maxRegions={1}
      regions={svgregions}
      onChange={addRegion}
      regionStyle={regionStyle}
      constraint
      style={{
        border: '1px solid #0FA0CE',
        minHeight: '500px',
      }}
    >
      <SVGRenderer svgUrl={plan.svgUrl} svgStatus={svgStatus} updateSvgStatus={updateSvgStatus} />
    </RegionSelect>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SVGRegionSelect);
