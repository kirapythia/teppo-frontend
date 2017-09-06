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
    <div className="container">
      <h2>{ t('button.add_project') }</h2>
      <ProjectForm />
      <div className="row">
        <div className="column column-40">
          <Link className="button button-outline full-width" href={HOME}>
            <i className="fa fa-times fa-lg vertical-middle" aria-hidden="true" />&nbsp;
            {t('button.cancel')}
          </Link>
        </div>
        <div className="column column-40 column-offset-20">
          <button className="button full-width">
            <i className="fa fa-floppy-o fa-lg vertical-middle" aria-hidden="true" />&nbsp;
            {t('button.save_project')}
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ProjectPage;
