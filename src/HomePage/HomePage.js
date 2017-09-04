import React from 'react';
import { Link } from 'redux-little-router';

import { PROJECT } from '../constants/routes';
import Counter from '../Counter';

/**
 * Landing page
 */
const HomePage = () => (
  <div>
    <h2>Home</h2>
    <Counter />
    <Link href={PROJECT}>&gt; project page</Link>
  </div>
);

export default HomePage;
