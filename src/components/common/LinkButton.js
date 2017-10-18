import React from 'react';
import { Link } from 'redux-little-router';
import cx from 'classnames';

/**
 * A button that acts like a link
 * @param {object} props
 * @param {string} props.href Link target
 * @param {string} props.icon Icon className (like fa-pencil)
 * @param {string} props.text Button label text
 * @param {string} props.className Classname applied to the Link-component
 */
const LinkButton = ({ href, icon, text, className }) => (
  <Link className={cx('button', className)} href={href}>
    <i className={cx('fa', icon)} aria-hidden="true" />&nbsp;
    {text}
  </Link>
);

export default LinkButton;
