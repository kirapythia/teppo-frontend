import React from 'react';
import cx from 'classnames';

/**
 * Choose correct text and icon for the button's state
 * @param {boolean} isSubmitting
 * @param {string} defaultIconClass
 * @param {string[]} texts
 */
const chooseContent = (isSubmitting, defaultIconClass, texts = []) => (isSubmitting
  ? <span>
    <i className="fa fa-spinner fa-spin fa-lg" aria-hidden="true" />&nbsp;
    {texts[0]}
  </span>
  : <span>
    <i className={defaultIconClass} aria-hidden="true" />&nbsp;
    {texts[1] || texts[0]}
  </span>);

/**
 * Button that displays a spinner when isSubmitting is true
 * @param {object} props
 * @param {string} props.className
 * @param {boolean} props.isSubmitting
 * @param {string[]} props.texts Text showing when not submitting (texts[0]) and
 *                                 when submitting (texts[1])
 * @param {string} props.defaultIconClass Icon displayed when isSubmitting is false
 * @param {object} props.buttonProps Props assigned to the button element
 */
const SpinnerButton = ({ className, isSubmitting, texts, defaultIconClass, buttonProps }) => (
  <button type="button" className={cx('button', className)} {...buttonProps}>
    {chooseContent(isSubmitting, defaultIconClass, texts)}
  </button>
);

export default SpinnerButton;
