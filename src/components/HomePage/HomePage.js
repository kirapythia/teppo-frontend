import React from 'react';
import { Link } from 'redux-little-router';
import { connect } from 'react-redux';
import t from '../../locale';
import { PROJECT } from '../../constants/routes';
import ProjectList from '../ProjectList';

const mapStateToProps = state => ({
  projects: state.projectList.projects,
  error: state.projectList.error,
});

/**
 * Landing page
 */
const HomePage = ({ projects, error }) => (
  <div>
    <ProjectList projectList={projects} error={error} />
    <Link className="button button-primary" href={PROJECT}>
      <i className="fa fa-file-o" />&nbsp;
      {t('button.add_project')}
    </Link>
  </div>
);

// export default HomePage;
export default connect(mapStateToProps)(HomePage);
