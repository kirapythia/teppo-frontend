import React from 'react';
import { Link } from 'redux-little-router';
import { connect } from 'react-redux';
import * as ROUTES from '../../constants/routes';
import t from '../../locale';
import { getCurrentProject, getCurrentSisterProjects, listPlans } from '../../selectors';
import { omit } from '../../utils';
import fields from '../../forms/project';
import ShowDetails from '../ShowDetails';
import Message from '../common/Message';
import PlansList from '../PlansList';
import LoadingOverlay from '../common/LoadingOverlay';
import { ProjectList } from '../ProjectList';

import './ProjectDetails.css';

const mapStateToProps = state => ({
  error: state.projectDetails.error,
  project: getCurrentProject(state),
  sisterProjects: getCurrentSisterProjects(state),
  plans: listPlans(state),
  isFetching: state.projectDetails.isFetching,
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
const ProjectDetails = ({ error, removePlan, project, plans, isFetching, sisterProjects }) => (
  <div className="ProjectDetails">
    <LoadingOverlay isVisible={isFetching} />
    {error && (
      <div>
        <Message type="danger" message={error.message} />
        <Link href={ROUTES.HOME}>{t('link.back_to_home_page')}.</Link>
      </div>
    )}
    {!error && project && (
      <div className="ProjectDetails__content-wrapper">
        <ShowDetails
          title={project.name}
          details={omit(['name', 'projectId', 'plans'], project)}
          fields={fields}
        />

        <div>
          <h3>{t('project.sister_projects')}</h3>
          <ProjectList projects={sisterProjects} />
        </div>

        <div className="ProjectDetails__plans-wrapper">
          <h3>{t('header.project.plans')}</h3>
          <PlansList project={project} plans={plans} removePlan={removePlan} />
        </div>

        <div className="row ProjectDetails__actions-wrapper">
          <div className="six columns">
            <Link className="button u-full-width" href={`/project/${project.projectId}/edit`}>
              <i className="fa fa-fw fa-pencil fa-lg" aria-hidden="true" />&nbsp;{t('button.edit_project')}
            </Link>
          </div>
          <div className="six columns">
            <Link className="button button-primary u-full-width" href={`/project/${project.projectId}/plan/new`}>
              <i className="fa fa-fw fa-file-o fa-lg" aria-hidden="true" />&nbsp;{t('button.add_plan')}
            </Link>
          </div>
        </div>
      </div>
    )}
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);
