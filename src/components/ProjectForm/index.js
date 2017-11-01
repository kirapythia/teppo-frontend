import ProjectForm from './ProjectForm';
import reducer, { NAME, PROJECT_SUCCESS } from './ProjectForm.ducks';

const actionTypes = {
  PROJECT_SUCCESS,
};

export default ProjectForm;
export { reducer, NAME, actionTypes };
