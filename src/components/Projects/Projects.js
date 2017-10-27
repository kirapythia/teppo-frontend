import React from 'react';
import t from '../../locale';
import { PROJECT } from '../../constants/routes';
import LinkButton from '../common/LinkButton';
import ProjectListContainer from '../ProjectList';

/**
 * User's projects by role, Filtering Missing????
 */
const Projects = ({ role }) =>  (
  <div>
  <ProjectListContainer />
  <LinkButton
    className="button-primary"
    href={PROJECT}
    icon="fa-file-o"
    text={t('button.add_project')}
  />
  </div>
);

export default Projects;
