import { reducer as formReducer } from 'redux-form';
import * as ProjectForm from '../components/ProjectForm';
import * as PlanForm from '../components/PlanForm';
import * as Notifications from '../components/Notifications';
import * as ProjectDetails from '../components/ProjectDetails';
import * as PlanDetails from '../components/PlanDetails';
import * as ProjectList from '../components/ProjectList';
import * as Comments from '../components/PlanComments';
import projectReducer, * as Project from './project.ducks';
import * as Plans from './plans';

/**
 * All redux reducers as an object. Reducer name as key and reducer function as value
 * @type {object}
 */
export default {
  form: formReducer,
  [ProjectForm.NAME]: ProjectForm.reducer,
  [PlanForm.NAME]: PlanForm.reducer,
  [Notifications.NAME]: Notifications.reducer,
  [ProjectDetails.NAME]: ProjectDetails.reducer,
  [PlanDetails.NAME]: PlanDetails.reducer,
  [ProjectList.NAME]: ProjectList.reducer,
  [Comments.NAME]: Comments.reducer,
  [Project.NAME]: projectReducer,
  [Plans.NAME]: Plans.reducer,
};
