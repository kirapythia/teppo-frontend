import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'redux-little-router';
import t from '../../locale';
import Message from '../common/Message';
import LoadingOverlay from '../common/LoadingOverlay';
import './ProjectList.css';

const mapStateToProps = state => ({
  projects: state.projectList.projects,
  error: state.projectList.error,
  isFetching: state.projectList.isFetching,
});

/**
 * Show list of projects
 */
const ProjectList = ({ projects, error, isFetching }) => (
  <div className="ProjectList">
    <LoadingOverlay isVisible={isFetching} />

    <h2>{t('projectlist.header')}</h2>
    {error && <Message type="danger" message={error.message} />}
    {!error && projects && (
      <div>
        <div className="ProjectList__header">
          <div className="two columns">Tunniste</div>
          <div className="ten columns">Projektin nimi</div>
        </div>
        <ul className="ProjectList clear-list-styles">
          {projects.map(({ projectId, hansuProjectId, name }) => (
            <li key={projectId}>
              <Link href={`project/${projectId}`}>
                <div className="two columns ProjectList__hansuId">{hansuProjectId}</div>
                <div className="nine columns">{name}</div>
                <div className="one column"><i className="fa fa-eye" /></div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

export default connect(mapStateToProps)(ProjectList);
