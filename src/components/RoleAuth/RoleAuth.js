import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  role: state.user.role,
});

// authorized[<roles>]

export const RoleAuth = ({ authorized, role, children }) => (
  <div className="RoleAuth">
    {authorized.includes(role) ? children : null }
  </div>
);

export default connect(mapStateToProps)(RoleAuth);
