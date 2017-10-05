import { createAction, handleActions } from 'redux-actions';
import { LOCATION_CHANGED } from 'redux-little-router';
import { loop, Cmd } from 'redux-loop';
import { reset } from 'redux-form';
import { omit } from '../../utils';
import { editComment, saveComment, updateComment } from './model';
import { PLAN_DETAILS } from '../../constants/routes';

export const NAME = 'comments';

const ADD_COMMENT = 'pythia-webclient/PlanComments/ADD_COMMENT';
const ADD_COMMENT_SUCCESS = 'pythia-webclient/PlanComments/ADD_COMMENT_SUCCESS';
const ADD_COMMENT_ERROR = 'pythia-webclient/PlanComments/ADD_COMMENT_ERROR';
const TOGGLE_COMMENT_APPROVAL = 'pythia-webclient/PlanComments/TOGGLE_COMMENT_APPROVAL';
const TOGGLE_COMMENT_APPROVAL_ERROR = 'pythia-webclient/PlanComments/TOGGLE_COMMENT_APPROVAL_ERROR';
const CLEAR_COMMENT_ADD_ERROR = 'pythia-webclient/PlanComments/CLEAR_COMMENT_ADD_ERROR';
const CLEAR_COMMENT_EDIT_ERROR = 'pythia-webclient/PlanComments/CLEAR_COMMENT_EDIT_ERROR';

export const actions = {
  /**
   * Action to fire a add comment request
   * @param {object} comment
   * @return {object}
   */
  addComment: createAction(
    ADD_COMMENT,
    (plan, comment) => ({ plan, comment })
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

  /**
   * Action for approving a comment
   * @param {object} plan
   * @param {object} comment
   * @return {object}
   */
  toggleCommentApproval: createAction(
    TOGGLE_COMMENT_APPROVAL,
    (plan, comment, isApproved) => ({ plan, comment, isApproved })
  ),

  /**
   * Action fired after plan edit request fails
   * @param {Error}
   * @returns {object}
   */
  toggleCommentApprovalError: createAction(
    TOGGLE_COMMENT_APPROVAL_ERROR
  ),

  /**
   * Action to clear error from the state
   * @returns {object}
   */
  clearCommentAddError: createAction(
    CLEAR_COMMENT_ADD_ERROR,
  ),

  /**
   * Action to clear error from the state
   * @returns {object}
   */
  clearCommentEditError: createAction(
    CLEAR_COMMENT_EDIT_ERROR,
  ),
};

/**
 * Reducer's initial state
 * FIXME: remove these when actually implemented
 * @type {object}
 */
const initialState = {
  comments: {
    1: { commentId: 1, author: 'Seija Suunnittelija', text: 'Tämä on testikommentti' },
    2: { commentId: 2, author: 'Seija Suunnittelija', text: 'Tässä dokumentissa on paljon virheitä!', approved: false },
    3: { commentId: 3, author: 'Seija Suunnittelija', text: 'Tämä on kommentti ilman titleä!', approved: true },
  },
};

export default handleActions({
  // initialize component when route changes
  [LOCATION_CHANGED]: (state, action) => {
    const { route } = action.payload;
    return route === PLAN_DETAILS
      ? omit(['commentAddError', 'commentEditError'], state)
      : state;
  },
  // handle add comment action
  [ADD_COMMENT]: (state, action) => loop(
    omit(['commentAddError'], state),
    Cmd.run(saveComment, {
      successActionCreator: actions.addCommentSuccess,
      failActionCreator: actions.addCommentError,
      args: [action.payload.plan, action.payload.comment],
    })
  ),
  // handle successfull add
  [ADD_COMMENT_SUCCESS]: (state, action) => loop(
    { ...state, comments: updateComment(state.comments, action.payload) },
    Cmd.action(reset(NAME))
  ),
  // handle add failure
  [ADD_COMMENT_ERROR]: (state, action) => ({ ...state, commentAddError: action.payload }),
  // handle approve comment action. Mark comment approved and update it on the server
  [TOGGLE_COMMENT_APPROVAL]: (state, action) => {
    const { comments } = state;
    const { comment, plan } = action.payload;
    const updated = { ...comment, approved: action.payload.isApproved };
    const stateWithoutError = omit(['commentEditError'], state);

    return loop(
      { ...stateWithoutError, comments: updateComment(comments, updated) },
      Cmd.run(editComment, {
        failActionCreator: actions.toggleCommentApprovalError,
        args: [plan, comment],
      })
    );
  },
  // Handle comment approval toggle error action. Revert comment's
  // approved status to what it was before send.
  [TOGGLE_COMMENT_APPROVAL_ERROR]: (state, action) => {
    const [comment, error] = action.payload;
    const updated = { ...state.comments[comment.commentId], approved: comment.approved };
    return { ...state, commentEditError: error, comments: updateComment(state.comments, updated) };
  },
  // Handle clear comment form error action. Remove commentAddError from the state.
  [CLEAR_COMMENT_ADD_ERROR]: state => omit(['commentAddError'], state),
  // Handle clear form error action. Remove error from the state.
  [CLEAR_COMMENT_EDIT_ERROR]: state => omit(['commentEditError'], state),
}, initialState);
