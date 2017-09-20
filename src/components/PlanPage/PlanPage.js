import React from 'react';
import { connect } from 'react-redux';

import t from '../../locale';
import { pick } from '../../utils';
import { ShowDetails } from '../ProjectDetails';
import PlanForm from '../PlanForm';
import './PlanPage.css';

const mapStateToProps = state => ({
  project: state.projectDetails.project,
});

/**
 * Page for creating a new plan
 */
const PlanPage = ({ project = {} }) => (
  <div className="PlanPage container">
    <h2>{ t('button.add_plan') }</h2>
    <ShowDetails
      details={pick(['name', 'hansuProjectId'], project)}
      className="ShowDetails--highlighted"
    />
    <PlanForm />
  </div>
);

export default connect(mapStateToProps)(PlanPage);
