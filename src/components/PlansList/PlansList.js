import React from 'react';
import PlanListItem from './PlanListItem';
import { sortPlans } from './model';
import './PlansList.css';

/**
 * Component for displaying project's plans as a list
 * @param {object} props
 * @param {object} props.project
 * @param {object[]} props.plans
 * @param {function} props.removePlan
 */
const PlansList = ({ project = { plans: [] }, removePlan }) => (
  <ul className="PlansList clear-list-styles">
    {sortPlans(project.plans).map(plan => (
      <PlanListItem
        key={plan.planId}
        plan={plan}
        project={project}
        removePlan={removePlan}
      />
    ))}
  </ul>
);

export default PlansList;
