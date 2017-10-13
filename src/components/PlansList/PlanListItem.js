import React from 'react';
import { Link } from 'redux-little-router';
import { formIdentifier } from './model';
import { parseFileNameFromURL, versionToCharacter } from '../../utils';

/**
 * Component for displaying project's plans as a list
 * @param {object} props
 * @param {object} props.plan
 * @param {number} props.projectId
 */
const PlanListItem = ({ plan = {}, project = {} }) => (
  <li className="PlansListItem">
    <div className="one column">
      {plan.approved
        ? <i className="text-success fa fa-check" />
        : <span>&nbsp;</span>
      }
    </div>
    <div className="three columns PlansListItem__identifier">
      <Link href={`/project/${project.projectId}/plan/${plan.planId}`}>
        {formIdentifier(plan)}
      </Link>
    </div>
    <div className="five columns">{(plan.url
      ? <a href={plan.url} target="_blank">{parseFileNameFromURL(plan.url)}</a>
      : '-'
    )}
    </div>
    <div className="one columns">{versionToCharacter(plan.version)}</div>
    <div className="two columns text-right">
      <Link href={`/project/${project.projectId}/plan/${plan.planId}/edit`}>
        <i className="fa fa-pencil fa-lg" />
      </Link>
    </div>
  </li>
);

export default PlanListItem;
