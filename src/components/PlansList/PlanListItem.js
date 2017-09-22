import React from 'react';
import IconButton from '../common/IconButton';

/**
 * Component for displaying project's plans as a list
 * @param {object} props
 * @param {object} props.plan
 * @param {function} props.removePlan
 */
const PlanListItem = ({ plan = {}, removePlan }) => (
  <li className="PlanListItem">
    <div className="PlanListItem__identifiers">
      {plan.mainNo}/{String(plan.subNo)}
    </div>
    <div>
      <IconButton className="fa-times fa-lg" onClick={removePlan} />
    </div>
  </li>
);

export default PlanListItem;
