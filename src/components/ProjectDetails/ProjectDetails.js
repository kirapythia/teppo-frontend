import React from 'react';
import { Link } from 'redux-little-router';
import { connect } from 'react-redux';
import t from '../../locale';
import ShowDetails from './ShowDetails';
import { getCurrentProjectId } from '../../selectors';
import Message from '../common/Message';
import * as ROUTES from '../../constants/routes';
import { omit } from '../../utils';

const mapStateToProps = state => ({
  projectId: getCurrentProjectId(state),
  project: state.projectDetails.project,
  error: state.projectDetails.error,
});

/**
 * Show project details
 */
const ProjectDetails = ({ projectId, error, project }) => (
  <div className="container">
    {error && (
      <div>
        <Message type="danger" message={error.message} />
        <Link href={ROUTES.HOME}>{t('link.back_to_home_page')}.</Link>
      </div>
    )}
    {!error && project && (
      <div>
        <ShowDetails
          title={project.name}
          details={omit(['name', 'projectId'], project)}
        />
        <Link className="button" href={`/project/${projectId}/plan/new`}>
          <i className="fa fa-fw fa-file-o fa-lg" aria-hidden="true" />&nbsp;{t('button.add_plan')}
        </Link>
      </div>
    )}
  </div>
);

export default connect(mapStateToProps)(ProjectDetails);
