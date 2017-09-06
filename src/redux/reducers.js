import { reducer as formReducer } from 'redux-form';
import * as Counter from '../components/Counter';


/**
 * All redux reducers as an object. Reducer name as key and reducer function as value
 * @type {object}
 */
export default {
  form: formReducer,
  [Counter.NAME]: Counter.reducer,
};
