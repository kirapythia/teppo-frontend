import React from 'react';

import t from '../../locale';
import PlanForm from '../PlanForm';

/**
 * Page for creating a new plan
 */
const PlanPage = () => (
  <div>
    <div className="container">
      <h2>{ t('button.add_plan') }</h2>
      <PlanForm />
    </div>
  </div>
);

export default PlanPage;
