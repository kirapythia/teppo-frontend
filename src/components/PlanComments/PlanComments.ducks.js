import { createAction, handleActions } from 'redux-actions';
import * as R from 'ramda';
import { LOCATION_CHANGED } from 'redux-little-router';
import { loop, Cmd } from 'redux-loop';
import { reset } from 'redux-form';
import { listToMapBy } from '../../utils';
import { editComment, saveComment, updateComment } from './model';
import { PLAN_DETAILS } from '../../constants/routes';
import { actionTypes as ProjectDetails } from '../ProjectDetails';

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
    TOGGLE_COMMENT_APPROVAL_ERROR,
    R.identity,
    (error, comment) => ({ comment }),
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
  comments: {},
};

const byId = listToMapBy('textId');

const listAllComments = R.pipe(
  R.prop('latestPlans'),
  R.pluck('commentValues'),
  R.flatten,
);

export default handleActions({
  // initialize component when route changes
  [LOCATION_CHANGED]: (state, action) => {
    const { route } = action.payload;
    return route === PLAN_DETAILS
      ? R.omit(['commentAddError', 'commentEditError'], state)
      : state;
  },
  [ProjectDetails.FETCH_PROJECT_SUCCESS]: (state, action) =>
    ({ ...state, comments: byId(listAllComments(action.payload)) }),
  // handle add comment action
  [ADD_COMMENT]: (state, action) => loop(
    R.omit(['commentAddError'], state),
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
    const stateWithoutError = R.omit(['commentEditError'], state);

    return loop(
      { ...stateWithoutError, comments: updateComment(comments, updated) },
      Cmd.run(editComment, {
        failActionCreator: error => actions.toggleCommentApprovalError(error, comment),
        args: [plan, updated],
      })
    );
  },
  // Handle comment approval toggle error action. Revert comment's
  // approved status to what it was before send.
  [TOGGLE_COMMENT_APPROVAL_ERROR]: (state, action) => {
    const { comment: { textId, approved } } = action.meta;
    const updated = { ...state.comments[textId], approved };
    return {
      ...state,
      commentEditError: action.payload,
      comments: updateComment(state.comments, updated),
    };
  },
  // Handle clear comment form error action. Remove commentAddError from the state.
  [CLEAR_COMMENT_ADD_ERROR]: state => R.omit(['commentAddError'], state),
  // Handle clear form error action. Remove error from the state.
  [CLEAR_COMMENT_EDIT_ERROR]: state => R.omit(['commentEditError'], state),
}, initialState);
