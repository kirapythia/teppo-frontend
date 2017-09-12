import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import cx from 'classnames';
import { actions } from './Notifications-ducks';
import CloseIconButton from '../common/CloseIconButton';

import './Notifications.css';

/**
 * Gather all the props needed from the application state
 * @param {object} state
 * @return {object}
 */
const mapStateToProps = state => ({
  notifications: state.notifications.notifications,
});

/**
 * Gather all the action creators needed
 * @param {function} dispatch the dispatcher function
 * @return {object}
 */
const mapDispatchToProps = dispatch => bindActionCreators({
  removeNotification: actions.removeNotification,
}, dispatch);

/**
 * Notification container. Displays notifications to the user
 * @param {object} props
 * @param {object[]} props.notifications A list of notification objects
 * @param {function} props.removeNotification An action for removing a notification
 */
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
