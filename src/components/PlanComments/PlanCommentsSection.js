import React from 'react';
import { connect } from 'react-redux';
import t from '../../locale';
import { getCurrentPlan } from '../../selectors';
import PlanCommentsList from './PlanCommentsList';

const mapStateToProps = state => ({
  plan: getCurrentPlan(state),
});

/**
 * A wrapper component for displaying a list of plan comments with a header
 * @param {object} props
 * @param {object} props.plan
 */
const PlanCommentsSection = ({ plan }) => (
  <section className="PlanComments__container">
    <h3>{t('plan.comments.title')}</h3>
    <PlanCommentsList comments={plan.comments} />
  </section>
);

export default connect(mapStateToProps)(PlanCommentsSection);
