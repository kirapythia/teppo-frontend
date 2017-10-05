import React from 'react';
import cx from 'classnames';
import t from '../../locale';

const formIconClassName = isApproved => cx('fa', 'fa-2x', isApproved ? 'fa-comment' : 'fa-comment-o');

const chooseActionButton = (comment, callback) => (comment.approved
  ? <button className="button button-red" onClick={() => callback(comment, false)}>
    <i className="fa fa-undo" />
  </button>
  : <button className="button button-green" onClick={() => callback(comment, true)}>
    <i className="fa fa-check" />&nbsp;{t('button.approve')}
  </button>
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
      {comment.text}
    </div>
    <div>
      {chooseActionButton(comment, onApproveClick)}
    </div>
  </li>
);

export default PlanCommentsListItem;
