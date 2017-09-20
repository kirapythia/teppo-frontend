import React from 'react';
import './UserPanel.css';

const UserPanel = ({ user: { name } = {} }) => (
  <div className="UserPanel">
    <div className="UserPanel__name"><span>{name}</span></div>
    <div><i className="fa fa-user fa-2x" /></div>
  </div>
);

export default UserPanel;
