import { createAction, handleActions } from 'redux-actions';
import { loop, Cmd } from 'redux-loop';
import { PROJECTS} from '../../constants/routes'
import { push } from 'redux-little-router';


/**
 * Export reducer's name
 */
export const NAME  = 'user';

const SELECT_USER_ROLE = 'pythia-webclient/Projects/SELECT_USER_ROLE';

export const actions = {
  selectUserRole: createAction(SELECT_USER_ROLE)
};

// UserRole reducer
 export default handleActions({
  [SELECT_USER_ROLE]: (state, action)  =>
  loop(
    { ...action.payload },
    Cmd.action(push(PROJECTS))
  )
}, {});
