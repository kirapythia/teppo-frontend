import { reducer as formReducer } from 'redux-form';
import * as ProjectForm from '../components/ProjectForm';
import * as PlanForm from '../components/PlanForm';
import projectsReducer, { NAME as projectReducerName } from './projects-ducks';
import * as Notifications from '../components/Notifications';

/**
 * All redux reducers as an object. Reducer name as key and reducer function as value
 * @type {object}
 */
export default {
  form: formReducer,
  [ProjectForm.NAME]: ProjectForm.reducer,
  [PlanForm.NAME]: PlanForm.reducer,
  [projectReducerName]: projectsReducer,
  [Notifications.NAME]: Notifications.reducer,
};
