import React from 'react';
import cx from 'classnames';

/**
 * Component wrapper for button elements, optionally with an icon
 * @param {object} props
 * @param {string} props.text Button text
 * @param {string} props.className Class names applied to the button element
 * @param {string} [props.icon] Class names applied to the icon element
 *                              If falsy then the icon is not displayed
 * @param {...*} props.rest
 */
const Button = ({ text, className, icon, ...rest }) => (
  <button
    type="button"
    className={cx('button', className)}
    {...rest}
  >
    {icon && <span><i className={cx('fa', icon)} />&nbsp;</span>}
    {text}
  </button>
);

export default Button;
