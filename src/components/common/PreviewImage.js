import React from 'react';

const inPx = size => `${size}px`;

/**
 * A preview image that acts as a link to the full image
 * @param {object} props
 * @param {string} props.url
 * @param {string} props.className
 * @param {number} props.size
 */
const PreviewImage = ({ url, className, size = 100 }) => (
  <a className={className} href={url} target="_blank">
    <div
      className="PreviewImage_crop"
      style={{ background: `#eee url(${url}) 50% 50% no-repeat`, width: inPx(size), height: inPx(size) }}
    />
  </a>
);

export default PreviewImage;
