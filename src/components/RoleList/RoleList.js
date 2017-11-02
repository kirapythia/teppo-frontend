import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as R from 'ramda';
import USER_ROLES from '../../constants/user_roles';
import t from '../../locale';
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
  <div className="RoleList">
    <div className="row">
      <div className="three columns">&nbsp;</div>
      <div className="six columns text-center">
        <h3>{t('home.title')}:</h3>
      </div>
      <div className="three columns">&nbsp;</div>
    </div>
    <ul className="clear-list-styles">
      {R.toPairs(USER_ROLES).map(([role, user]) => (
        <li key={role} className="RoleListItem row">
          <div className="three columns">&nbsp;</div>
          <div className="six columns">
            <button onClick={() => selectUserRole({ role, user })}>
              <i className="fa fa-user fa-fw" aria-hidden="true" />&nbsp;
              {user}
            </button>
          </div>
          <div className="three columns">&nbsp;</div>
        </li>
      ))}
    </ul>
  </div>
);

export default connect(null, mapDispatchToProps)(RoleList);
