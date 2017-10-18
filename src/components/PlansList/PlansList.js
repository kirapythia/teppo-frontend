import React from 'react';
import PlanListItem from './PlanListItem';
import { sortPlans } from './model';
import t from '../../locale';
import './PlansList.css';

/**
 * Component for displaying project's plans as a list
 * @param {object} props
 * @param {object} props.project
 * @param {object[]} props.plans
 * @param {boolean} props.readOnly If true all actions are disabled
 */
const PlansList = ({ project, plans, readOnly }) => (
  <div>
    {!!plans.length && <div className="PlansList__header">
      <div className="one column">&nbsp;</div>
      <div className="three columns">{t('common.id')}</div>
      <div className="five columns">{t('common.file')}</div>
      <div className="two columns">{t('common.version')}</div>
      <div className="one columns">&nbsp;</div>
    </div>}
    <ul className="PlansList clear-list-styles">
      {plans.length
        ? sortPlans(plans).map(plan => (
          <PlanListItem
            key={plan.planId}
            plan={plan}
            project={project}
            readOnly={readOnly}
          />))
        : <li className="PlansList__placeholder text-italic">{t('project.details.no_plans')}</li>
      }
    </ul>
  </div>
);

export default PlansList;
