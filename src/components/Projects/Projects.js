import React from 'react';
import t from '../../locale';
import { PROJECT } from '../../constants/routes';
import LinkButton from '../common/LinkButton';
import ProjectListContainer from '../ProjectList';
import RoleAuth from '../RoleAuth';
import authorized from '../../constants/user_authorization';


/**
 * Project listing page
 */
const Projects = () => (
  <div>
    <ProjectListContainer />
    <RoleAuth authorized={authorized.createProjectAuthorized}>
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
