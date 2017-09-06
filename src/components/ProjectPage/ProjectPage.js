import React from 'react';
import { Link } from 'redux-little-router';

import { HOME } from '../../constants/routes';
import t from '../../locale';

import ProjectForm from './ProjectForm';

/**
 * Page for project details
 */
const ProjectPage = () => (
  <div>
    <h2>{ t('button.add_project') }</h2>
    <ProjectForm />
    <button className="button">
      {t('button.save_project')}
    </button>
    <Link className="button" href={HOME}>{t('button.cancel')}</Link>
  </div>
);

export default ProjectPage;
