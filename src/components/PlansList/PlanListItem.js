import React from 'react';
import * as R from 'ramda';
import { Link } from 'redux-little-router';
import PLAN_STATUS from '../../constants/plan-status';
import { formPlanIdentifierText, getPlanFileUrls, formPlanUrl, parseFileNameFromURL, versionToCharacter } from '../../utils';

/**
 * Form link elements for each file url
 * @private
 * @param {object}
 * @return {React.Element[]|string}
 */
const formPlanFileUrls = R.pipe(
  getPlanFileUrls,
  // eslint-disable-next-line react/no-array-index-key
  R.map((url, idx) => (<a key={`${url}_${idx}`} href={url} className="PlanListItem__fileUrl" target="_blank">{parseFileNameFromURL(url)}</a>)),
  R.defaultTo('-'),
);

/**
 * Choose a correct component for indicating plan status
 * @param {object} props
 * @param {object} plan
 */
const PlanStatusIcon = ({ plan }) => {
  if (plan.maintenanceDuty) {
    return <i className="text-success fa fa-check-circle-o" />;
  }
  if (plan.status === PLAN_STATUS.APPROVED) {
    return <i className="text-success fa fa-check" />;
  }
  return <span>&nbsp;</span>;
};

/**
 * Component for displaying project's plans as a list
 * @param {object} props
 * @param {object} props.plan
 * @param {number} props.projectId
 */
const PlanListItem = ({ plan = {}, project = {} }) => (
  <li className="PlansListItem">
    <div className="one column"><PlanStatusIcon plan={plan} /></div>
    <div className="three columns PlansListItem__identifier">
      <Link href={formPlanUrl(project.projectId, plan.planId)}>
        {formPlanIdentifierText(plan)}
      </Link>
    </div>
    <div className="six columns">{formPlanFileUrls(plan)}</div>
    <div className="two columns">{versionToCharacter(plan.version)}</div>
  </li>
);

export default PlanListItem;
