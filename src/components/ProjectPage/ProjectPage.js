import React from 'react';
import { connect } from 'react-redux';
import t from '../../locale';
import ProjectForm from '../ProjectForm';
import { getCurrentProject } from '../../selectors';

const mapStateToProps = state => ({
  project: getCurrentProject(state),
});

/**
 * Page for creating a new project
 */
const ProjectPage = ({ project }) => (
  <div>
    <div className="container">
      <h2>{ project ? t('button.edit_project') : t('button.add_project') }</h2>
      <ProjectForm project={project} />
    </div>
  </div>
);

export default connect(mapStateToProps)(ProjectPage);
