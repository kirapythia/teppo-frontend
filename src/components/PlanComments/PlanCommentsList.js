import React from 'react';
import PlanCommentsListItem from './PlanCommentsListItem';
import t from '../../locale';
import './PlanCommentsList.css';

/**
 * A list component for dislaying a list of comments
 * @param {object} props
 * @param {object[]} props.comments
 */
const PlanCommentsList = ({ comments = [] }) => (
  <ul className="PlanCommentsList clear-list-styles">
    {!!comments.length && comments.map(c => <PlanCommentsListItem key={c.commentId} comment={c} />)}
    {!comments.length && <li className="text-italic">{t('plan.comments.no_comments')}</li>}
  </ul>
);

export default PlanCommentsList;
