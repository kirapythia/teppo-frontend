import React from 'react';
import { Link } from 'redux-little-router';
import t from '../../locale';
import { PROJECT } from '../../constants/routes';
import Button from '../common/Button';

/**
 * Landing page
 */
const HomePage = () => (
  <div>
    <Button typeClass="primary">
      <Link href={PROJECT}>{t('button.add_project')}</Link>
    </Button>
  </div>
);

export default HomePage;
