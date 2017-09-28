import React from 'react';
import { Link } from 'redux-little-router';
// import t from '../../locale';
import Message from '../common/Message';
import './ProjectList.css';
import { PROJECT_DETAILS } from '../../constants/routes';

/**
 * Show list of projects
 */

const ProjectList = ({ projectList, error }) => (
  <div className="container">
    {error && (
      <div>
        <Message type="danger" message={error.message} />
        {/* <Link href={ROUTES.HOME}>{t('link.back_to_home_page')}.</Link>
        <td>{projectId}</td> */}
      </div>
    )}
    {!error && projectList && (
      <div>
        <table className="u-full-width">
          <thead>
            <tr><th>thPäänumero</th><th>thNimi</th></tr>
          </thead>
          {projectList.map(({ projectId, hansuProjectId, name, mainNo, description }) => (
            <tbody>
              {/* <Link href={`project/${projectId}`}> */}
              <tr key={projectId}>

                <td><Link href={`project/${projectId}`}>{mainNo}</Link></td>

                <td><Link href={`project/${projectId}`}>{name}</Link></td>

              </tr>
              {/* */}
            </tbody>
          ))}

        </table>
      </div>
    )}
  </div>
);

export default ProjectList;
