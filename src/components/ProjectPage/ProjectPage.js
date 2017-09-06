import React from 'react';
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
    </div>
  </div>
);

export default ProjectPage;
