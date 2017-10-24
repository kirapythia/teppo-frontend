import React from 'react';
import { connect } from 'react-redux';
import t from '../../locale';
import { getCurrentPlan, getCurrentProject } from '../../selectors';
import ShowDetails from '../ShowDetails';
import PlanForm from '../PlanForm';
import './PlanPage.css';

const mapStateToProps = state => ({
  project: getCurrentProject(state),
  plan: getCurrentPlan(state),
});

const formProjectDetailFields = project => ([
  { label: t('project.name'), value: project.name },
  { label: t('project.hansuProjectId'), value: project.hansuProjectId },
  { label: t('plan.primary_id'), value: project.mainNo },
]);

/**
 * Page for creating a new plan
 * @param {object} props
 * @param {object} props.plan
 * @param {object} props.project
 */
const PlanPage = ({ plan, project = {} }) => (
  <div className="PlanPage">
    <h2>{ plan ? t('button.edit_plan') : t('plan.add.header') }</h2>
    <ShowDetails
      fields={formProjectDetailFields(project)}
      className="ShowDetails--highlighted"
    />
    <PlanForm plan={plan} />
  </div>
);

export default connect(mapStateToProps)(PlanPage);
