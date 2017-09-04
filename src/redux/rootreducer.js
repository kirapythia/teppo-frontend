import { combineReducers } from 'redux';
import * as Counter from '../Counter';

export default combineReducers({
  [Counter.NAME]: Counter.reducer,
});
