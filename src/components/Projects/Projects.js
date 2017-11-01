import React from 'react';
import t from '../../locale';
import { PROJECT } from '../../constants/routes';
import LinkButton from '../common/LinkButton';
import ProjectListContainer from '../ProjectList';
import RoleAuth from '../RoleAuth';
import authorized from '../../constants/user_authorization';


/**
 * LIst all projects. Should be list user's projects by role, Filtering Missing????
 */
const Projects = ({ role }) => (
  <div>
    <ProjectListContainer />
    <RoleAuth authorized={authorized.createProjectAuthorized} role={role} >
      <LinkButton
        className="button-primary"
        href={PROJECT}
        icon="fa-file-o"
        text={t('button.add_project')}
      />
    </RoleAuth>
  </div>
);

export default Projects;
