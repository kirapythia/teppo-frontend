import React from 'react';
import cx from 'classnames';
import t from '../../locale';
import Button from '../common/Button';
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

/**
 * A single row in comments list
 * @param {object} props
 * @param {object} props.comment
 */
const PlanCommentsListItem = ({ comment, onApproveClick, readOnly }) => (
  <li className={cx('PlanCommentsListItem', { 'PlanCommentsListItem--approved': comment.approved })}>
    <div className="PlanCommentsListItem__image">
      {comment.url
        ? <PreviewImage url={comment.url} size={60} />
        : <i className="fa fa-2x fa-comment-o" aria-hidden />
      }
    </div>
    <div className="PlanCommentsListItem__body">
      <div className="PlanCommentsListItem__author">
        <a href="mailto:seija.suunnittelija@espoo.fi">Seija Suunnittelija</a>
      </div>
      {comment.ptext}
    </div>
    {!readOnly && (<div>{chooseActionButton(comment, onApproveClick)}</div>)}
  </li>
);

export default PlanCommentsListItem;
