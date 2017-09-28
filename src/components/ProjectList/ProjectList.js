import React from 'react';
import { Link } from 'redux-little-router';
// import t from '../../locale';
import Message from '../common/Message';
import './ProjectList.css';
import { PROJECT_DETALS } from '../../constants/routes';

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
        <table>
          <tr><th>thPäänumero</th><th>thNimi</th></tr>
          {projectList.map(({ projectId, hansuProjectId, name, mainNo, description }) => (
            <tbody>


              <tr key={projectId}>
                <Link href={`project/${projectId}`}>
                  <td>{mainNo}</td>
                  <td>{name}</td>
                </Link>
              </tr>


            </tbody>
          ))}

        </table>
      </div>
    )}
  </div>
);

export default ProjectList;
