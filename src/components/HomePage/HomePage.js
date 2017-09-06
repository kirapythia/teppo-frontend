import React from 'react';
import { Link } from 'redux-little-router';
import t from '../../locale';
import { PROJECT } from '../../constants/routes';

/**
 * Landing page
 */
const HomePage = () => (
  <div>
    <Link className="button" href={PROJECT}>{t('button.add_project')}</Link>
  </div>
);

export default HomePage;
