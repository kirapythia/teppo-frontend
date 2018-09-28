import React from 'react';
import * as _ from 'lodash';
import PlanCommentsListItem from './PlanCommentsListItem';
import t from '../../locale';
import './PlanCommentsList.css';
import USER_ROLES from '../../constants/user_roles';

const ListOfAllComments = (comments, toggleCommentApproval, readOnly) => (
  <ul className="PlanCommentsList clear-list-styles">
    {comments.map(comment => (
      <PlanCommentsListItem
        key={comment.textId}
        comment={comment}
        readOnly={readOnly}
        onApproveClick={toggleCommentApproval}
      />
    ))}
  </ul>
);

const GroupedListOfAllComments = (comments, toggleCommentApproval, readOnly) => {
  const groupedComments = _.groupBy(comments, c => c.createdBy);
  console.log(groupedComments);
  return (
    <div>
      {Object.keys(groupedComments).map(commentGroup => (
        <div key={commentGroup}>
          <b>{commentGroup}</b>
          <ul className="PlanCommentsList clear-list-styles">
            {groupedComments[commentGroup].map(comment => (
              <PlanCommentsListItem
                key={comment.textId}
                comment={comment}
                readOnly={readOnly}
                onApproveClick={toggleCommentApproval}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
)};

/**
 * A list component for dislaying a list of comments
 * @param {object} props
 * @param {object[]} props.comments
 * @param {boolean} props.readOnly If true the plan cannot be approved
 * @param {function} props.approveComment callback for approve comment button onclick
 */
const PlanCommentsList = ({ comments = [], toggleCommentApproval, readOnly }) => (
  <div>
    {!!comments.length && GroupedListOfAllComments(comments, toggleCommentApproval, readOnly)}
    {/*!!comments.length && ListOfAllComments(comments, toggleCommentApproval, readOnly)*/}
    {!comments.length && <div className="NoComments text-italic">{t('plan.comments.no_comments')}</div>}
  </div>
);

export default PlanCommentsList;
