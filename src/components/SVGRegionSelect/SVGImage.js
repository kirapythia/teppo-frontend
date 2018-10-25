import React from 'react';

const SVGImage = ({ svgUrl }) => (
  <div>
    {<img className="plansvg" src={svgUrl} alt="" />}
  </div>
);

export default SVGImage;
