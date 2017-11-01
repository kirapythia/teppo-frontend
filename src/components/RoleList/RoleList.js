import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as R from 'ramda';
import USER_ROLES from '../../constants/user_roles';
import { actions } from '../../redux/users/users.ducks';
import { filterEnter } from '../../utils';
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
  <div>
    <ul className="FilesList clear-list-styles">
      {R.toPairs(USER_ROLES).map(([role, user]) => (
        <div key={role}>
          <div className="three columns" />
          <div className="six columns">
            <li
              role="button"
              className="RoleListItem"
              tabIndex="0"
              onClick={() => selectUserRole({ role, user })}
              onKeyPress={filterEnter(() => selectUserRole({ role, user }))}
            >
              <i className="fa fa-user fa-fw" aria-hidden="true" />&nbsp;
              {user}
            </li>
          </div>
          <div className="three columns" />
        </div>
      ))}
    </ul>
  </div>
);

export default connect(null, mapDispatchToProps)(RoleList);
