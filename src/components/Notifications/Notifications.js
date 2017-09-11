import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import cx from 'classnames';
import { actions } from './Notifications-ducks';
import CloseIconButton from '../common/CloseIconButton';

import './Notifications.css';

const mapStateToProps = state => ({
  notifications: state.notifications.notifications,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  removeNotification: actions.removeNotification,
}, dispatch);

const Notifications = ({ notifications, removeNotification }) => (
  <div className="Notifications__container">
    {notifications.map(({ id, type, title, message, isVisible }) => (
      <div
        key={id}
        role="presentation"
        className={cx(
          'Notification',
          `Notification--${type.toLowerCase()}`,
          { 'Notification--visible': isVisible }
        )}
      >
        <div className="Notification__title-wrapper">
          <CloseIconButton onClose={() => removeNotification(id)} />
          {title && <h4 className="Notification__title">{title}</h4>}
        </div>
        {message && <div>{ message }</div>}
      </div>
    ))}
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
