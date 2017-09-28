import React from 'react';
import { Link } from 'redux-little-router';
import t from '../../locale';
import { HOME } from '../../constants/routes';
import espooLogo from './espoo_logo.png';

const Header = () => (
  <header className="Header container">
    <div className="row">
      <div className="column column-100">
        <h1 className="Header__title">
          <Link href={HOME}>
            <img className="Header__logo" src={espooLogo} alt="Espoo" />
            <span>{t('app.name')}</span>
          </Link>
        </h1>
      </div>
    </div>
  </header>
);

export default Header;
