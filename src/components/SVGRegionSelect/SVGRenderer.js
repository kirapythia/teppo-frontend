import React from 'react';
import SVGInline from 'react-svg-inline';

const fetchSvgImage = (svgUrl, svgStatus, updateSvgStatus) => {
  if (svgUrl !== svgStatus.svgUrl) {
    const loadingSvgStatus = Object.assign({}, svgStatus);
    loadingSvgStatus.svgUrl = svgUrl;
    loadingSvgStatus.loading = true;
    updateSvgStatus(loadingSvgStatus);
    fetch(svgUrl)
      .then(res => res.text())
      .then((text) => {
        const svgDocument = new DOMParser().parseFromString(text, 'text/xml');
        const svgElement = svgDocument.getElementsByTagName('svg')[0];
        const loadedSvgStatus = Object.assign({}, loadingSvgStatus);
        loadedSvgStatus.svg = text;
        loadedSvgStatus.svgWidth = svgElement.getAttribute('width');
        loadedSvgStatus.svgHeight = svgElement.getAttribute('height');
        loadedSvgStatus.loading = false;
        updateSvgStatus(loadedSvgStatus);
      });
  }
};

const SVGRenderer = ({ svgUrl, svgStatus, updateSvgStatus }) => {
  fetchSvgImage(svgUrl, svgStatus, updateSvgStatus);
  if (svgStatus.loading) {
    return <div className="spinner" />;
  } else if (!svgStatus.svg) {
    return <div className="error" />;
  }
  return <SVGInline viewBox={`0 0 ${svgStatus.svgWidth} ${svgStatus.svgHeight}`} svg={svgStatus.svg} component="svg" />;
};

export default SVGRenderer;
