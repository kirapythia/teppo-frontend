import { createAction, handleActions } from 'redux-actions';
import { loop, Cmd } from 'redux-loop';
import { reset } from 'redux-form';
import { omit, wait } from '../../utils';

export const NAME = 'comments';

const ADD_COMMENT = 'pythia-webclient/PlanComments/ADD_COMMENT';
const ADD_COMMENT_SUCCESS = 'pythia-webclient/PlanComments/ADD_COMMENT_SUCCESS';
const ADD_COMMENT_ERROR = 'pythia-webclient/PlanComments/ADD_COMMENT_ERROR';

export const actions = {
  /**
   * Action to fire a add comment request
   * @param {object} comment
   * @return {object}
   */
  addComment: createAction(
    ADD_COMMENT,
  ),
  /**
   * Action fired after a comment was successfully added
   * @param {object} comment
   * @return {object}
   */
  addCommentSuccess: createAction(
    ADD_COMMENT_SUCCESS
  ),
  /**
   * Action fired after comment adding fails
   * @param {object} error
   * @return {object}
   */
  addCommentError: createAction(
    ADD_COMMENT_ERROR
  ),
};

/**
 * Reducer's initial state
 * FIXME: remove these when actually implemented
 * @type {object}
 */
const initialState = {
  comments: [
    { commentId: 1, author: 'Seija Suunnittelija', body: 'Tämä on testikommentti' },
    { commentId: 2, author: 'Seija Suunnittelija', body: 'Tässä dokumentissa on paljon virheitä!' },
    { commentId: 3, author: 'Seija Suunnittelija', body: 'Tämä on kommentti ilman titleä!' },
  ],
};

export default handleActions({
  // handle add comment action
  [ADD_COMMENT]: (state, action) => loop(
    omit(['error'], state),
    // FIXME: replace wait with REST call when implemented
    Cmd.run(wait, {
      successActionCreator: actions.addCommentSuccess,
      failActionCreator: actions.addCommentError,
      args: [500, action.payload],
    })
  ),
  // handle successfull add
  [ADD_COMMENT_SUCCESS]: (state, action) => loop(
    { ...state, comments: [...state.comments, action.payload] },
    Cmd.action(reset(NAME))
  ),
  // handle add failure
  [ADD_COMMENT_ERROR]: (state, action) => ({ ...state, error: action.payload }),
}, initialState);
