import React from 'react';
import objectAssign from 'object-assign';
import SVGInline from 'react-svg-inline';
import iconSVG from '../common/200100102.svg';
import RegionSelect from 'react-region-select';
import { notStrictEqual } from 'assert';


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


const RegionSelectArea = ({ svgurl, svgregions, comment, onChange }) =>
  (
    <RegionSelect
      maxRegions={1}
      regions={svgregions}
           // regionStyle={regionStyle}     
      constraint
      debug
      onChange={onChange}
      regionRenderer={regionRenderer}
      style={{ border: '1px solid #0FA0CE' }}
    >
      <SVGInline
        viewBox="0 0 3000 2000"
        svg={iconSVG}
        component="svg"
      />

    </RegionSelect>


  );

export default RegionSelectArea;
