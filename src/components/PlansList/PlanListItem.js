import React from 'react';
import { Link } from 'redux-little-router';
import { formIdentifier } from './model';
import { versionToCharacter } from '../../utils';
import IconButton from '../common/IconButton';

/**
 * Component for displaying project's plans as a list
 * @param {object} props
 * @param {object} props.plan
 * @param {number} props.projectId
 * @param {function} props.removePlan
 */
const PlanListItem = ({ plan = {}, project = {}, removePlan }) => (
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
      <IconButton
        className="PlansListItem__RemoveButton fa-times fa-lg"
        onClick={() => removePlan(plan)}
      />
    </div>
  </li>
);

export default PlanListItem;
