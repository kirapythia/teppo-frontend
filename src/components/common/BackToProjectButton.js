import React from 'react';
import { Link } from 'redux-little-router';
import t from '../../locale';

/**
 * Button that acts as a link to plan's parent project
 * @param {object} props
 * @param {object} props.plan
 */
const BackToProjectButton = ({ plan }) => (
  <Link className="button u-full-width" href={`/project/${plan.projectId}`}>
    <i className="fa fa-angle-left fa-lg" aria-hidden="true" />&nbsp;
    {t('button.back_to_project')}
  </Link>
);

export default BackToProjectButton;
