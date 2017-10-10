import component from './ProjectDetails';
import ShowDetails from '../ShowDetails';
import reducer, { NAME, FETCH_PROJECT_SUCCESS, actions } from './ProjectDetails.ducks';

const actionTypes = {
  FETCH_PROJECT_SUCCESS,
};

export { ShowDetails, reducer, NAME, actions, actionTypes };
export default component;
