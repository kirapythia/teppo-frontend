import React from 'react';
import { connect } from 'react-redux';

import { ShowDetails } from '../ProjectDetails';

import t from '../../locale';
import PlanForm from '../PlanForm';
import { tidy } from './model';

const mapStateToProps = state => ({
  project: state.projectDetails.project,
});

/**
 * Page for creating a new plan
 */
const PlanPage = ({ project = {} }) => (
  <div>
    <div className="container">
      <h2>{ t('button.add_plan') }</h2>
      <ShowDetails project={tidy(project)} />
      <PlanForm />
    </div>
  </div>
);

export default connect(mapStateToProps)(PlanPage);
