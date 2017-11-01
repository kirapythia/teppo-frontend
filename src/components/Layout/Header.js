import React from 'react';
import { Link } from 'redux-little-router';
import t from '../../locale';
import { HOME } from '../../constants/routes';
import espooLogo from './espoo_logo_no_text.png';

const Header = () => (
  <header className="Header container">
    <h1 className="Header__title">
      <Link href={HOME}>
        <img className="Header__logo" src={espooLogo} alt="Espoo" />
        <span>{t('app.name')}</span>
      </Link>
    </h1>
  </header>
);

export default Header;
