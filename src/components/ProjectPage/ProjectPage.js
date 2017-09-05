import React from 'react';
import { Link } from 'redux-little-router';

import { HOME } from '../../constants/routes';
import Button from '../common/Button';
import t from '../../locale';

/**
 * Page for project details
 */
const ProjectPage = () => (
  <div>
    <Link href={HOME}>&lt; {t('link.home_page')}</Link>
    <Button typeClass="primary">
      {t('button.save_project')}
    </Button>
  </div>
);

export default ProjectPage;
