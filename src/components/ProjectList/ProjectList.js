import React from 'react';
import { Link } from 'redux-little-router';
import t from '../../locale';
import Message from '../common/Message';
import * as ROUTES from '../../constants/routes';

// { projectId: 1, hansuProjectId: '1234H', name: 'testip', mainNo: 2345, description: 'kuvaus' }
// projectId, hansuProjectId, name, mainNo, description

/**
 * Show list of projects
 */

const ProjectList = ({ projectList, error }) => (
  <div className="container">
    {error && (
      <div>
        <Message type="danger" message={error.message} />
        <Link href={ROUTES.HOME}>{t('link.back_to_home_page')}.</Link>
      </div>
    )}
    {!error && projectList && (
      <div>
        <ul>
          {projectList.map(({ projectId }) => (
            <li key={projectId}>{projectId}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

export default ProjectList;
