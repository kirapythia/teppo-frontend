import React from 'react';
import { Link } from 'redux-little-router';
import { connect } from 'react-redux';
import * as ROUTES from '../../constants/routes';
import t from '../../locale';
import { getCurrentProjectId } from '../../selectors';
import { omit } from '../../utils';
import ShowDetails from './ShowDetails';
import Message from '../common/Message';
import PlansList from '../PlansList';
import './ProjectDetails.css';

const mapStateToProps = state => ({
  projectId: getCurrentProjectId(state),
  project: state.projectDetails.project,
  error: state.projectDetails.error,
});

const mapDispatchToProps = () => ({
  // FIXME: replace when implemented!
  removePlan: () => undefined,
});

/**
 * Show project details with plans list etc.
 * @param {object} props
 * @param {number} props.projectId
 * @param {Error} props.error
 * @param {object} props.project
 * @param {function} props.removePlan
 */
const ProjectDetails = ({ projectId, error, project, removePlan }) => (
  <div className="ProjectDetails container">
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
          details={omit(['name', 'projectId', 'plans'], project)}
        />

        <h3>Projektiin liittyvät suunnitelmat</h3>
        <PlansList plans={project.plans} removePlan={removePlan} />

        <div className="ProjectDetails__actions_wrapper">
          <Link className="button" href={`/project/${projectId}/plan/new`}>
            <i className="fa fa-fw fa-file-o fa-lg" aria-hidden="true" />&nbsp;{t('button.add_plan')}
          </Link>
        </div>
      </div>
    )}
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);
