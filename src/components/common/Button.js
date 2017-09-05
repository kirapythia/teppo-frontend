import React from 'react';
import cx from 'classnames';

import './Button.css';

const Button = ({ typeClass, children }) => (
  <div className={cx('button', typeClass)}>
    { children }
  </div>
);

export default Button;
