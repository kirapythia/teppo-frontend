import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../constants/routes';
import Layout from '../Layout';

const ProjectPage = () => (
  <Layout>
    <h2>Project</h2>
    <Link to={ROUTES.HOME}>&lt; home page</Link>
  </Layout>
);

export default ProjectPage;
