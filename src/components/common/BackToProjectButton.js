import React from 'react';
import t from '../../locale';
import BackToLocationButton from './BackToLocationButton';
/**
 * Button that acts as a link to plan's parent project
 * @param {object} props
 * @param {object} props.plan
 */
const BackToProjectButton = ({ plan }) => (
  <BackToLocationButton
    text={t('button.back_to_project')}
    href={`/project/${plan.projectId}`}
    className="u-full-width"
  />
);

export default BackToProjectButton;
