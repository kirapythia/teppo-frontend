import * as Counter from '../components/Counter';

/**
 * All redux reducers as an object. Reducer name as key and reducer function as value
 * @type {object}
 */
export default {
  [Counter.NAME]: Counter.reducer,
};
