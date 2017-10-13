import React from 'react';
import { Link } from 'redux-little-router';
import cx from 'classnames';
/**
 * A link button with an icon indicating that it takes the user back to somewhere
 * @param {object} props
 * @param {string} text
 * @param {string} href
 * @param {string} className
 */
const BackToLocationButton = ({ text, href, className }) => (
  <Link className={cx('button', className)} href={href}>
    <i className="fa fa-angle-left fa-lg" aria-hidden="true" />&nbsp;
    {text}
  </Link>
);

export default BackToLocationButton;
