import React from 'react';
import { Link } from 'redux-little-router';
import { formIdentifier } from './model';
import { versionToCharacter } from '../../utils';

/**
 * Component for displaying project's plans as a list
 * @param {object} props
 * @param {object} props.plan
 * @param {number} props.projectId
 */
const PlanListItem = ({ plan = {}, project = {} }) => (
  <li className="PlansListItem">
    <div className="three columns PlansListItem__identifier">
      <Link href={`/project/${project.projectId}/plan/${plan.planId}`}>
        {formIdentifier(plan)}
      </Link>
    </div>
    <div className="three columns">{versionToCharacter(plan.version)}</div>
    <div className="six columns text-right">
      <Link href={`/project/${project.projectId}/plan/${plan.planId}/edit`}>
        <i className="fa fa-pencil fa-lg" />
      </Link>
    </div>
  </li>
);

export default PlanListItem;
