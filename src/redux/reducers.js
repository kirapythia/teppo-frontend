import { reducer as formReducer } from 'redux-form';
import * as ProjectForm from '../components/ProjectForm';


/**
 * All redux reducers as an object. Reducer name as key and reducer function as value
 * @type {object}
 */
export default {
  form: formReducer,
  [ProjectForm.NAME]: ProjectForm.reducer,
};
