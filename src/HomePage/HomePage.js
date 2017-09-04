import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../constants/routes';
import Layout from '../Layout';
import Counter from '../Counter';

const HomePage = () => (
  <Layout>
    <h2>Home</h2>
    <Counter />
    <Link to={ROUTES.PROJECT}>&gt; project page</Link>
  </Layout>
);

export default HomePage;
