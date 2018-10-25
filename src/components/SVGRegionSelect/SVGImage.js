import React from 'react';

import './SVGRegionSelect.css';

const SVGImage = ({ svgUrl }) => (
  <div>
    {<img className="plansvg" src={svgUrl} alt="" />}
  </div>
);

export default SVGImage;
