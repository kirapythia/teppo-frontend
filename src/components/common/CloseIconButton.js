import React from 'react';

// call given fn only when enter is pressed
const filterEnter = fn => e => (e.key === 'Enter' && fn());

/**
 * Close button icon. Closable with mouse or keyboard.
 * @param {object} props
 * @param {function} onClose
 */
const CloseIconButton = ({ onClose }) => (
  <i
    tabIndex={0}
    role="button"
    className="CloseIconButton fa fa-times"
    onClick={onClose}
    onKeyPress={filterEnter(onClose)}
    style={{ cursor: 'pointer' }}
  />
);

export default CloseIconButton;
