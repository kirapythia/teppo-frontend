import React from 'react';
import t from '../../locale';
import Modal from './Modal';
import './LoadingOverlay.css';

/**
 * An overlay with a spinner for indicating that a component is working on something
 * @param {object} props
 * @param {boolean} props.isVisible
 * @param {JSXElement[]} props.children
 */
const LoadingOverlay = ({ isVisible, text = `${t('lang.loading')}...` }) => (
  <Modal isVisible={isVisible} className="LoadingOverlay">
    <div className="LoadingOverlay__content">
      <div className="LoadingOverlay__spinner">
        <i className="fa fa-pulse fa-spinner fa-5x" />
      </div>
      <span>{text}</span>
    </div>
  </Modal>
);

export default LoadingOverlay;
