import React from 'react';
import IconButton from './IconButton';

/**
 * Close button icon. Closable with mouse or keyboard.
 * @param {object} props
 * @param {function} onClose
 */
const CloseIconButton = ({ onClose }) => (
  <IconButton
    className="CloseIconButton fa-times"
    onClick={onClose}
  />
);

export default CloseIconButton;
