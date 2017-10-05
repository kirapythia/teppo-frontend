import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import t from '../../locale';
import { getCurrentPlan } from '../../selectors';
import { getSortedComments } from './selectors';
import { actions } from './PlanComments.ducks';
import PlanCommentsList from './PlanCommentsList';
import PlanCommentForm from './PlanCommentForm';
import Message from '../common/Message';

/**
 * Select needed props from the global state
 * @param {object} state
 * @return {object} props
 */
const mapStateToProps = state => ({
  plan: getCurrentPlan(state),
  comments: getSortedComments(state),
  formSendError: state.comments.commentAddError,
  commentEditError: state.comments.commentEditError,
});

/**
 * Bind action creators to dispatch
 * @param {function} dispatch
 * @return {object} action creators
 */
const mapDispatchToProps = dispatch => bindActionCreators({
  addComment: actions.addComment,
  toggleCommentApproval: actions.toggleCommentApproval,
  clearCommentAddError: actions.clearCommentAddError,
  clearCommentEditError: actions.clearCommentEditError,
}, dispatch);

/**
 * Merge state props and action creators
 * @param {object} stateProps
 * @param {object} actionCreators
 * @return {object} props passed to PlanCommentsSection component
 */
const mergeProps = (stateProps, actionCreators) => ({
  ...stateProps,
  ...actionCreators,
  toggleCommentApproval: (comment, isApproved) =>
    actionCreators.toggleCommentApproval(stateProps.plan, comment, isApproved),
  addComment: comment =>
    actionCreators.addComment(stateProps.plan, comment),
});

/**
 * A wrapper component for displaying a list of plan comments with a header
 * @param {object} props
 * @param {object} props.plan
 * @param {object} props.comments
 * @param {function} props.addComment
 * @param {Error} props.formSendError
 */
const PlanCommentsSection = ({
  comments,
  addComment,
  toggleCommentApproval,
  clearCommentAddError,
  clearCommentEditError,
  formSendError,
  commentEditError,
}) => (
  <section className="PlanComments__container">
    <h3>{t('plan.comments.title')}</h3>
    { commentEditError &&
      <Message message={commentEditError.message} onClose={clearCommentEditError} />
    }
    <PlanCommentsList
      comments={comments}
      toggleCommentApproval={toggleCommentApproval}
    />
    <PlanCommentForm
      addComment={addComment}
      formSendError={formSendError}
      clearError={clearCommentAddError}
    />
  </section>
);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PlanCommentsSection);
