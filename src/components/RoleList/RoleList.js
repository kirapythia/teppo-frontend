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

const mapStateToProps = state => ({
  // role: getCurrentRole(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  selectUserRole: actions.selectUserRole,
}, dispatch);

 const RoleList = ({ selectUserRole }) => (
    <div>
        <ul className="FilesList clear-list-styles">
          {R.toPairs(USER_ROLES).map(([ role, user ]) => (
            <div>
            <div className="three columns">
              </div>
              <div className="six columns">
                <li className="RoleListItem" onClick = {() => selectUserRole({role, user})} key={role}>
                  <i className="fa fa-user fa-fw" aria-hidden="true" />&nbsp;
                  {user}
                </li>
              </div>
              <div className="three columns">
              </div>
          </div>
          ))
          }
      </ul>
    </div>
 );

export default connect(mapStateToProps, mapDispatchToProps)(RoleList);
