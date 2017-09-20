import { reducer as formReducer } from 'redux-form';
import * as ProjectForm from '../components/ProjectForm';
import * as PlanForm from '../components/PlanForm';
import * as Notifications from '../components/Notifications';
import * as ProjectDetails from '../components/ProjectDetails';

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
};
