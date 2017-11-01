import React from 'react';
import PlanCommentsListItem from './PlanCommentsListItem';
import t from '../../locale';
import './PlanCommentsList.css';

/**
 * A list component for dislaying a list of comments
 * @param {object} props
 * @param {object[]} props.comments
 * @param {boolean} props.readOnly If true the plan cannot be approved
 * @param {function} props.approveComment callback for approve comment button onclick
 */
const PlanCommentsList = ({ comments = [], toggleCommentApproval, readOnly }) => (
  <ul className="PlanCommentsList clear-list-styles">
    {!!comments.length && comments.map(comment => (
      <PlanCommentsListItem
        key={comment.textId}
        comment={comment}
        readOnly={readOnly}
        onApproveClick={toggleCommentApproval}
      />
    ))}
    {!comments.length && <li className="text-italic">{t('plan.comments.no_comments')}</li>}
  </ul>
);

export default PlanCommentsList;
