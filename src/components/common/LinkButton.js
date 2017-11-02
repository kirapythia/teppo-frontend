import React from 'react';
import { Link } from 'redux-little-router';
import cx from 'classnames';

/**
 * A Link element that is rendered as a button
 * @param {object} props
 * @param {string} props.href Link target
 * @param {string} props.icon Icon className (like fa-pencil)
 * @param {string} props.text Button label text
 * @param {string} props.className Classname applied to the Link-component
 * @param {boolean} props.disabled
 */
const LinkButton = ({ href, icon, text, className, disabled }) => (
  <Link
    className={cx('button', className, { disabled })}
    href={href}
    tabIndex={disabled ? -1 : 0}
  >
    <i className={cx('fa', icon)} aria-hidden="true" />&nbsp;
    {text}
  </Link>
);

export default LinkButton;
