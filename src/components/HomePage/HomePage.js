import React from 'react';
import { Link } from 'redux-little-router';
import t from '../../locale';
import { PROJECT } from '../../constants/routes';

/**
 * Landing page
 */
const HomePage = () => (
  <div>
    <button className="button">
      <Link href={PROJECT}>{t('button.add_project')}</Link>
    </button>
  </div>
);

export default HomePage;
