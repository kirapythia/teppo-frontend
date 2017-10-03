import React from 'react';
import { Link } from 'redux-little-router';
import { formIdentifier } from './model';
import IconButton from '../common/IconButton';

/**
 * Component for displaying project's plans as a list
 * @param {object} props
 * @param {object} props.plan
 * @param {number} props.projectId
 * @param {function} props.removePlan
 */
const PlanListItem = ({ plan = {}, project = {}, removePlan }) => (
  <li className="PlanListItem">
    <div className="PlanListItem__identifiers">
      <Link href={`/project/${project.projectId}/plan/${plan.planId}`}>
        {formIdentifier(plan)}
      </Link>
    </div>
    <div>
      <Link href={`/project/${project.projectId}/plan/${plan.planId}/edit`}>
        <i className="fa fa-pencil fa-lg" />
      </Link>
      <IconButton className="PlanListItem__RemoveButton fa-times fa-lg" onClick={removePlan} />
    </div>
  </li>
);

export default PlanListItem;
