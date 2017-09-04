import React from 'react';
import { Link } from 'redux-little-router';

import { HOME } from '../constants/routes';

/**
 * Page for project details
 */
const ProjectPage = () => (
  <div>
    <h2>Project</h2>
    <Link href={HOME}>&lt; home page</Link>
  </div>
);

export default ProjectPage;
