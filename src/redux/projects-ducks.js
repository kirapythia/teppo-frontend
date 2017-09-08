import { handleActions } from 'redux-actions';

const initialState = [{
  id: 1234,
  hansuProjectId: 4321,
  mainNo: 5678,
  name: 'projektiMallikatu',
  alternativeNames: ['aaa', 'bbbbbbb', 'ccccc'],
  description: 'Jotain jotain',
}];

export const NAME = 'projects';

// reduce does nothing yet
export default handleActions({}, initialState);
