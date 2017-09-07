import React from 'react';
import { Link } from 'redux-little-router';
import { connect } from 'react-redux';
import t from '../../locale';

const mapStateToProps = state => ({
  projectId: state.router.params.projectId,
});
/**
 * Show project details
 */
const ProjectDetails = ({ projectId }) => (
  <div>
    <h2>Projektin tiedot</h2>
    <Link className="button" href={`/project/${projectId}/plan/new`}>
      <i className="fa fa-fw fa-file-o fa-lg" aria-hidden="true" />&nbsp;{t('button.add_plan')}
    </Link>
  </div>
);

export default connect(mapStateToProps)(ProjectDetails);
