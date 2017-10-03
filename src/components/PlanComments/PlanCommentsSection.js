import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import t from '../../locale';
import PlanCommentsList from './PlanCommentsList';
import PlanCommentForm from './PlanCommentForm';
import { actions } from './PlanComments.ducks';

const mapStateToProps = state => ({
  comments: state.comments.comments,
  formSendError: state.comments.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addComment: actions.addComment,
}, dispatch);

/**
 * A wrapper component for displaying a list of plan comments with a header
 * @param {object} props
 * @param {object} props.comments
 * @param {function} props.addComment
 * @param {Error} props.formSendError
 */
const PlanCommentsSection = ({ comments, addComment, formSendError }) => (
  <section className="PlanComments__container">
    <h3>{t('plan.comments.title')}</h3>
    <PlanCommentsList comments={comments} />
    <PlanCommentForm addComment={addComment} formSendError={formSendError} />
  </section>
);

export default connect(mapStateToProps, mapDispatchToProps)(PlanCommentsSection);
