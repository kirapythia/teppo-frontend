import React from 'react';
import { Link } from 'redux-little-router';
import { connect } from 'react-redux';
import t from '../../locale';
import { PROJECT } from '../../constants/routes';
import { ProjectList } from '../ProjectList';


const mapStateToProps = state => ({
  projects: state.projectList.projects,
});

/**
 * Landing page
 */
const HomePage = () => (
  <div>
    <ProjectList />
    <Link className="button" href={PROJECT}>{t('button.add_project')}</Link>
  </div>
);

// export default HomePage;
export default connect(mapStateToProps)(HomePage);
