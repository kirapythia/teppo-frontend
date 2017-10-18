import React from 'react';
import { Link } from 'redux-little-router';
import { formIdentifier } from './model';
import { formPlanUrl, parseFileNameFromURL, versionToCharacter } from '../../utils';

/**
 * Component for displaying project's plans as a list
 * @param {object} props
 * @param {object} props.plan
 * @param {number} props.projectId
 * @param {boolean} props.readOnly
 */
const PlanListItem = ({ plan = {}, project = {}, readOnly }) => (
  <li className="PlansListItem">
    <div className="one column">
      {plan.approved
        ? <i className="text-success fa fa-check" />
        : <span>&nbsp;</span>
      }
    </div>
    <div className="three columns PlansListItem__identifier">
      <Link href={formPlanUrl(project.projectId, plan.planId)}>
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
      {readOnly
        ? <span className="fa-stack">
          <i className="fa fa-pencil fa-stack-1x" style={{ color: '#222' }} />
          <i className="fa fa-ban fa-stack-2x text-danger fa-flip-horizontal" />
        </span>
        : <Link href={formPlanUrl(project.projectId, plan.planId, 'edit')}>
          <i className="fa fa-pencil fa-lg" />
        </Link>
      }
    </div>
  </li>
);

export default PlanListItem;
