import React from 'react';
import PlanListItem from './PlanListItem';
import './PlansList.css';

/**
 * Component for displaying project's plans as a list
 * @param {object} props
 * @param {object[]} props.plans
 * @param {function} props.removePlan
 */
const PlansList = ({ plans = [], removePlan }) => (
  <ul className="PlansList clear-list-styles">
    {plans.map(plan => (
      <PlanListItem
        key={plan.planId}
        plan={plan}
        removePlan={removePlan}
      />
    ))}
  </ul>
);

export default PlansList;
