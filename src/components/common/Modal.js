import React from 'react';
import cx from 'classnames';
import './Modal.css';

/**
 * Component for creating a modal overlay
 * @param {object} props
 * @param {boolean} props.isVisible
 * @param {string} props.className
 */
const Modal = ({ isVisible, className, children }) => (
  <div className={cx('Modal', className, { 'Modal--visible': isVisible })}>
    {children}
  </div>
);

export default Modal;
