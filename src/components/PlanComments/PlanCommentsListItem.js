import React from 'react';
import cx from 'classnames';
import t from '../../locale';
import Button from '../common/Button';

const formIconClassName = isApproved => cx('fa', 'fa-2x', isApproved ? 'fa-comment' : 'fa-comment-o');

const chooseActionButton = (comment, callback) => (comment.approved
  ? <Button
    className="button-red"
    onClick={() => callback(comment, false)}
    icon="fa-undo"
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
const PlanCommentsListItem = ({ comment, onApproveClick }) => (
  <li className={cx('PlanCommentsListItem', { 'PlanCommentsListItem--approved': comment.approved })}>
    <div><i className={formIconClassName(comment.approved)} aria-hidden /></div>
    <div className="PlanCommentsListItem__body">
      <div className="PlanCommentsListItem__author">
        <a href="mailto:seija.suunnittelija@espoo.fi">Seija Suunnittelija</a>
      </div>
      {comment.ptext}
    </div>
    <div>
      {chooseActionButton(comment, onApproveClick)}
    </div>
  </li>
);

export default PlanCommentsListItem;
