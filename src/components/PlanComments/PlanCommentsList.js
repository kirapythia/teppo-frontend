import React from 'react';
import * as _ from 'lodash';
import PlanCommentsListItem from './PlanCommentsListItem';
import t from '../../locale';
import './PlanCommentsList.css';
import USER_ROLES from '../../constants/user_roles';

const listOfComments = (comments, toggleCommentApproval, selectComment, readOnly) => (
  <ul className="PlanCommentsList clear-list-styles">
    {comments.map(comment => (
      <PlanCommentsListItem
        key={comment.ptextId}
        comment={comment}
        readOnly={readOnly}
        onApproveClick={toggleCommentApproval}
        onSelectComment={selectComment}
      />
    ))}
  </ul>
);

const groupedListOfAllComments = (comments, toggleCommentApproval, selectComment, readOnly) => {
  const groupedComments = _.groupBy(comments, c => c.createdBy);
  return (
    <div>
      {Object.keys(groupedComments).map(commentGroup => (
        <div key={commentGroup}>
          <b>{parseCategoryFromGroupName(commentGroup)}</b>
          {listOfComments(groupedComments[commentGroup], toggleCommentApproval, selectComment, readOnly)}
        </div>
      ))}
    </div>
)};

const parseCategoryFromGroupName = (group) => {
  return group.slice(group.indexOf('(') + 1, group.indexOf(')')).toUpperCase();
};

/**
 * A list component for dislaying a list of comments
 * @param {object} props
 * @param {object[]} props.comments
 * @param {boolean} props.readOnly If true the plan cannot be approved
 * @param {function} props.approveComment callback for approve comment button onclick
 */
const PlanCommentsList = ({ comments = [], toggleCommentApproval, selectComment, readOnly }) => (
  <div>
    {!!comments.length && groupedListOfAllComments(comments, toggleCommentApproval, selectComment, readOnly)}
    {/*!!comments.length && listOfComments(comments, toggleCommentApproval, readOnly)*/}
    {!comments.length && <div className="NoComments text-italic">{t('plan.comments.no_comments')}</div>}
  </div>
);

export default PlanCommentsList;
