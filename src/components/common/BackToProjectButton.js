import React from 'react';
import t from '../../locale';
import LinkButton from './LinkButton';
import { formProjectUrl } from '../../utils/ajax';
/**
 * Button that acts as a link to plan's parent project
 * @param {object} props
 * @param {object} props.plan
 */
const BackToProjectButton = ({ plan }) => (
  <LinkButton
    className="u-full-width"
    icon="fa-angle-left fa-lg"
    text={t('button.back_to_project')}
    href={formProjectUrl(plan.projectId)}
  />
);

export default BackToProjectButton;
