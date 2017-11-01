import React from 'react';
import PlanListItem from './PlanListItem';
import t from '../../locale';
import './PlansList.css';

/**
 * Component for displaying project's plans as a list
 * @param {object} props
 * @param {object} props.project
 * @param {object[]} props.plans
 * @param {string} props.placeholderText
 */
const PlansList = ({ project, plans, placeholderText = t('project.details.no_plans') }) => (
  <div>
    {!!plans.length && <div className="PlansList__header">
      <div className="one column">{t('common.status')}</div>
      <div className="three columns">{t('common.id')}</div>
      <div className="six columns">{t('common.file')}</div>
      <div className="two columns">{t('common.version')}</div>
    </div>}
    <ul className="PlansList clear-list-styles">
      {plans.length
        ? plans.map(plan => (
          <PlanListItem
            key={plan.planId}
            plan={plan}
            project={project}
          />))
        : <li className="PlansList__placeholder text-italic">{placeholderText}</li>
      }
    </ul>
  </div>
);

export default PlansList;
