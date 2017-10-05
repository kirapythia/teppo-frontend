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
 * @param {function} props.removePlan
 */
const PlansList = ({ project, plans, removePlan }) => (
  <ul className="PlansList clear-list-styles">
    {plans.length
      ? sortPlans(plans).map(plan => (
        <PlanListItem
          key={plan.planId}
          plan={plan}
          project={project}
          removePlan={removePlan}
        />))
      : <li className="PlansList__placeholder text-italic">{t('project.details.no_plans')}</li>
    }
  </ul>
);

export default PlansList;
