import React from 'react';
import { Link } from 'redux-little-router';
import t from '../../locale';
import Message from '../common/Message';
import './ProjectList.css';

/**
 * Show list of projects
 */
const ProjectList = ({ projectList, error }) => (
  <div className="ProjectList">
    <h2>{t('projectlist.header')}</h2>
    {error && <Message type="danger" message={error.message} />}
    {!error && projectList && (
      <div>
        <div className="ProjectList__header">
          <div className="two columns">Tunniste</div>
          <div className="ten columns">Projektin nimi</div>
        </div>
        <ul className="ProjectList clear-list-styles">
          {projectList.map(({ projectId, hansuProjectId, name }) => (
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

export default ProjectList;
