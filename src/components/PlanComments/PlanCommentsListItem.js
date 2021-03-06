import React from 'react';
import cx from 'classnames';
import Moment from 'react-moment';
import t from '../../locale';
import Button from '../common/Button';
import RoleAuth from '../RoleAuth';
import authorized from '../../constants/user_authorization';
import PreviewImage from '../common/PreviewImage';


const chooseActionButton = (comment, callback) => (comment.approved
  ? <Button
    onClick={() => callback(comment, false)}
    icon="fa-undo"
    text={t('button.cancel')}
    title={t('button.revert_comment_approve')}
  />
  : <Button
    className="button-green"
    icon="fa-check"
    text={t('button.approve')}
    onClick={() => callback(comment, true)}
  />
);

const getInitials = (fullName) => {
  const names = fullName.substring(0, fullName.indexOf('(') - 1).split(' ');
  const initials = names.map(name => `${name[0]}.`);
  return initials;
};

const isCurrentCommentSelected = (comment, selectedComment) =>
  comment && selectedComment && comment.ptextId === selectedComment.ptextId;

/**
 * A single row in comments list
 * @param {object} props
 * @param {object} props.comment
 */
const PlanCommentsListItem =
  ({ comment, selectedComment, onApproveClick, onSelectComment, readOnly }) => (
    <li className={cx('PlanCommentsListItem', {
        'PlanCommentsListItem--approved': comment.approved,
        'PlanCommentsListItem--selected': isCurrentCommentSelected(comment, selectedComment),
      })}
    >
      <div className="PlanCommentsListItem__image">
        {comment.url
          ? <PreviewImage url={comment.url} size={60} />
          : <i className="fa fa-2x fa-comment-o" aria-hidden />
        }
      </div>
      <div>
        {!isCurrentCommentSelected(comment, selectedComment)
          ? <button type="button" onClick={() => onSelectComment(comment)}>{t('button.select_comment')}</button>
          : <button type="button" onClick={() => onSelectComment(null)}>{t('button.unselect_comment')}</button>
        }
      </div>
      <div className="PlanCommentsListItem__body">
        <div className="PlanCommentsListItem__author">{comment.createdBy}</div>
        {comment.ptext}
      </div>
      <div>
        <div>{t('plan.comments.created_at')}: <Moment format="DD.MM.YYYY HH:mm">{comment.createdAt}</Moment></div>
        {comment.approved && comment.approvedAt && comment.approvedBy && (
          <div>
            {t('plan.comments.approved_at')}: <Moment format="DD.MM.YYYY HH:mm">{comment.approvedAt}</Moment>
            &nbsp;
            {getInitials(comment.approvedBy)}
          </div>
        )}
      </div>
      {!readOnly && (
        <RoleAuth authorized={authorized.planCommentsListItemAuthorized}>
          <div>{chooseActionButton(comment, onApproveClick)}</div>
        </RoleAuth>
      )}

    </li>
  );

export default PlanCommentsListItem;
