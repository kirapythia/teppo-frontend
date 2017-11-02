import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  role: state.user.role,
});

// authorized[<roles>]

export const RoleAuth = ({ authorized, role, children }) => (
  <div className="RoleAuth">
    {(authorized.indexOf(role) > -1) ? children : null }
  </div>
);

export default connect(mapStateToProps)(RoleAuth);
