import React from 'react';
import cx from 'classnames';
import CloseIconButton from './CloseIconButton';
import './Message.css';

/**
 * An alert box for displaying error messages
 * @param {object} props
 * @param {string} props.message Message to display
 * @param {function} props.onClose Callback for close icon/button
 */
const Message = ({ message, onClose, type = 'danger' }) => (
  <div className={cx('Message', 'alert', `alert-${type}`)}>
    <CloseIconButton onClose={onClose} />
    <span>{ message }</span>
  </div>
);

export default Message;
