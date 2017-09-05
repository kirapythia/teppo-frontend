import React from 'react';
import { Link } from 'redux-little-router';

import { HOME } from '../../constants/routes';
import t from '../../locale';
import Button from '../common/Button';

/**
 * Page for project details
 */
const ProjectPage = () => (
  <div>
    <h2>{ t('button.add_project') }</h2>
    <Button typeClass="primary">
      <Link href={HOME}>{t('button.cancel')}</Link>
    </Button>
  </div>
);

export default ProjectPage;
