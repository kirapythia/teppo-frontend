import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import t from '../../locale';
import Button from '../common/Button';
import RoleAuth from '../RoleAuth';
import { planCommentsListItemAuthorized } from '../../constants/user_authorization.json';

const authorized = planCommentsListItemAuthorized;

const mapStateToProps = state => ({
  role: state.user.role,
});

const formIconClassName = isApproved => cx('fa', 'fa-2x', isApproved ? 'fa-comment' : 'fa-comment-o');

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
const PlanCommentsListItem = ({ comment, onApproveClick, readOnly, role }) => (
  <li className={cx('PlanCommentsListItem', { 'PlanCommentsListItem--approved': comment.approved })}>
    <div><i className={formIconClassName(comment.approved)} aria-hidden /></div>
    <div className="PlanCommentsListItem__body">
      <div className="PlanCommentsListItem__author">
        <a href="mailto:seija.suunnittelija@espoo.fi">Seija Suunnittelija</a>
      </div>
      {comment.ptext}
    </div>
    {!readOnly && (
      <RoleAuth authorized={authorized} role={role} >
        <div>{chooseActionButton(comment, onApproveClick)}</div>
      </RoleAuth>
    )}
  </li>
);

export default connect(mapStateToProps)(PlanCommentsListItem);
