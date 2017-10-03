import React from 'react';
import { connect } from 'react-redux';

import t from '../../locale';
import { pick } from '../../utils';
import { getCurrentPlan, getCurrentProject } from '../../selectors';
import ShowDetails from '../ShowDetails';
import PlanForm from '../PlanForm';
import './PlanPage.css';

const mapStateToProps = state => ({
  project: getCurrentProject(state),
  plan: getCurrentPlan(state),
});

/**
 * Page for creating a new plan
 * @param {object} props
 * @param {object} props.plan
 * @param {object} props.project
 */
const PlanPage = ({ plan, project = {} }) => (
  <div className="PlanPage">
    <h2>{ plan ? t('button.edit_plan') : t('button.add_plan') }</h2>
    <ShowDetails
      details={pick(['name', 'hansuProjectId'], project)}
      className="ShowDetails--highlighted"
    />
    <PlanForm plan={plan} />
  </div>
);

export default connect(mapStateToProps)(PlanPage);
