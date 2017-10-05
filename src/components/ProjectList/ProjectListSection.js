import React from 'react';
import { connect } from 'react-redux';
import t from '../../locale';
import Message from '../common/Message';
import LoadingOverlay from '../common/LoadingOverlay';
import ProjectList from './ProjectList';

const mapStateToProps = state => ({
  projects: state.projectList.projects,
  error: state.projectList.error,
  isFetching: state.projectList.isFetching,
});

/**
 * Container for a project list component
 * @param {object} props
 * @param {object[]} props.projects
 * @param {Error} props.error
 * @param {boolean} props.isFetching
 */
const ProjectListContainer = ({ projects, error, isFetching }) => (
  <div className="ProjectList">
    <LoadingOverlay isVisible={isFetching} />

    <h2>{t('projectlist.header')}</h2>
    {error && <Message type="danger" message={error.message} />}
    {!error && projects && (
      <ProjectList projects={projects} />
    )}
  </div>
);

export default connect(mapStateToProps)(ProjectListContainer);
