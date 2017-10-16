import React from 'react';
import t from '../../locale';
import { PROJECT } from '../../constants/routes';
import LinkButton from '../common/LinkButton';
import ProjectListContainer from '../ProjectList';

/**
 * Landing page
 */
const HomePage = () => (
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

export default HomePage;
