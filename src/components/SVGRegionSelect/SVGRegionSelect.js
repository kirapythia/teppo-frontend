import React from 'react';
// import SVGInline from 'react-svg-inline';
import RegionSelect from 'react-region-select';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from './SVGRegionSelect.ducks';
import { getCurrentPlan } from '../../selectors';
// import SVGImage from './SVGImage';
// import iconSVG from '../common/2345_001.pdf.svg';

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
    svgregions,
    selectedComment,
    user: state.user.user,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
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
        backgroundImage: `url(${plan.svgUrl})`,
        height: '500px',
        backgroundSize: 'auto 500px',
        backgroundRepeat: 'no-repeat',
       }}
    >
      {
        /*
        <div>
          <SVGImage svgUrl={plan.svgUrl} />
          <SVGInline
            viewBox="0 0 4385 2245"
            svg={iconSVG}
            component="svg"
          />
        </div>
        */
      }
    </RegionSelect>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SVGRegionSelect);
