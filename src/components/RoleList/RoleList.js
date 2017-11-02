import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as R from 'ramda';
import USER_ROLES from '../../constants/user_roles';
import { actions } from '../../redux/users/users.ducks';
import './RoleList.css';

/**
 * Temporary list component for choosing role
 *
 *
 */

const mapDispatchToProps = dispatch => bindActionCreators({
  selectUserRole: actions.selectUserRole,
}, dispatch);

const RoleList = ({ selectUserRole }) => (
  <ul className="FilesList clear-list-styles">
    {R.toPairs(USER_ROLES).map(([role, user]) => (
      <li key={role} className="RoleListItem">
        <div className="three columns" />
        <div className="six columns">
          <button tabIndex="0" onClick={() => selectUserRole({ role, user })}>
            <i className="fa fa-user fa-fw" aria-hidden="true" />&nbsp;
            {user}
          </button>
        </div>
        <div className="three columns" />
      </li>
    ))}
  </ul>
);

export default connect(null, mapDispatchToProps)(RoleList);
