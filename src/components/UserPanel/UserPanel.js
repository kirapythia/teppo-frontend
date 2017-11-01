import React from 'react';
import { connect } from 'react-redux';
import './UserPanel.css';

const mapStateToProps = () => ({
  user: 'Sirpa Suunnittelija',
});

const UserPanel = ({ user }) => (
  <div className="UserPanel">
    <div className="UserPanel__name"><span>{user}</span></div>
    <div className="UserPanel__icon">
      <i className="fa fa-user fa-2x" />
    </div>
  </div>
);

export default connect(mapStateToProps)(UserPanel);
