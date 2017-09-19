import React from 'react';
import { Link } from 'redux-little-router';
import t from '../../locale';
import { HOME } from '../../constants/routes';

const Header = () => (
  <div className="Header">
    <h1><Link href={HOME}>{t('app.name')}</Link></h1>
  </div>
);

export default Header;
