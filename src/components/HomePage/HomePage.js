import React from 'react';
import { Link } from 'redux-little-router';
import t from '../../locale';
import { PROJECT } from '../../constants/routes';
import ProjectListContainer from '../ProjectList';

/**
 * Landing page
 */
const HomePage = () => (
  <div>
    <ProjectListContainer />
    <Link className="button button-primary" href={PROJECT}>
      <i className="fa fa-file-o" />&nbsp;
      {t('button.add_project')}
    </Link>
  </div>
);

export default HomePage;
