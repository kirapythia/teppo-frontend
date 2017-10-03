import React from 'react';
import cx from 'classnames';
import t from '../../locale';
import './LoadingOverlay.css';

/**
 * An overlay with a spinner for indicating that a component is working on something
 * @param {object} props
 * @param {boolean} props.isVisible
 * @param {JSXElement[]} props.children
 */
const LoadingOverlay = ({ isVisible, text = `${t('lang.loading')}...` }) => (
  <div className={cx('LoadingOverlay', { 'LoadingOverlay--visible': isVisible })}>
    <div className="LoadingOverlay__content">
      <div className="LoadingOverlay__spinner">
        <i className="fa fa-pulse fa-spinner fa-5x" />
      </div>
      <span>{text}</span>
    </div>
  </div>
);

export default LoadingOverlay;
