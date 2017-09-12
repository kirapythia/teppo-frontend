import { createAction, handleActions } from 'redux-actions';
import { loop, Cmd } from 'redux-loop';
import constants from './constants';
import { wait } from '../../utils';

export const NAME = 'notifications';

const ADD_NOTIFICATION = 'pythia-webclient/Notifications/ADD_NOTIFICATION';
const REMOVE_NOTIFICATION = 'pythia-webclient/Notifications/REMOVE_NOTIFICATION';
const CLEAR_NOTIFICATIONS = 'pythia-webclient/Notifications/CLEAR_NOTIFICATIONS';
const SHOW_NOTIFICATION = 'pythia-webclient/Notifications/SHOW_NOTIFICATION';

const createNotificationAction = (type, delay) => createAction(
  ADD_NOTIFICATION,
  (message, title = '') => ({
    type,
    title,
    message,
    delay,
    isVisible: false,
  })
);

export const actions = {
  /**
   * Add success notification (green)
    *@type {function}
   * @param {string} message
   * @param {string} [title]
   * @return {object}
   */
  addSuccessNotification: createNotificationAction(constants.SUCCESS, 6000),
  /**
   * Add error notification (red)
   * @see addSuccessNotification for details
   */
  addErrorNotification: createNotificationAction(constants.DANGER, 1 * 60 * 1000),
  /**
   * Add warning notification (yellow)
   * @see addSuccessNotification for details
   */
  addWarningNotification: createNotificationAction(constants.WARNING, 6000),

  /**
   * Set notification visible
   * @type {function}
   * @param {number} uid Id of the notification that will be shown
   * @return {object}
   */
  showNotification: createAction(
    SHOW_NOTIFICATION,
    uid => ({ uid })
  ),

  /**
   * Remove notification with given id from the state
   * @param {number} uid Id of the notification that will be shown
   * @return {object} action
   */
  removeNotification: createAction(
    REMOVE_NOTIFICATION,
    uid => ({ uid })
  ),
  /**
   * Remove all notifications from the state
   * @return {object}
   */
  clearNotifications: createAction(
    CLEAR_NOTIFICATIONS
  ),
};

const initialState = {
  nextId: 1,
  notifications: [],
};

export default handleActions({
  /**
   * Add notification to the notifications list and assign an id to the notification added
   */
  [ADD_NOTIFICATION]: (state, action) => {
    const withId = { ...action.payload, id: state.nextId };
    // return redux loop which is a command like object
    // middleware will intrepret and run the actions
    return loop(
      // pass on chanded state
      { nextId: state.nextId + 1, notifications: [...state.notifications, withId] },
      // wait 50ms and then dispatch showNotification action
      Cmd.run(wait, {
        successActionCreator: actions.showNotification,
        // these args are passed to wait and then to success action creator
        args: [50, withId.id],
      })
    );
  },
  /** Remove notification with given id from the state
   */
  [REMOVE_NOTIFICATION]: (state, action) => {
    // select all notifications but the one with id passed in action payload
    const notifications = state.notifications.filter(n => n.id !== action.payload.uid);
    // just return the altered state if changes were made
    // otherwise return the old state unmodified
    return notifications.length !== state.notifications.length
      ? { ...state, notifications }
      : state;
  },
  /**
   * Clear all notifications from the state
   */
  [CLEAR_NOTIFICATIONS]: state => ({
    ...state,
    notifications: (state.notifications.length ? [] : state.notifications),
  }),
  /**
   * Mark notification as visible
   */
  [SHOW_NOTIFICATION]: (state, action) => {
    const { notifications } = state;
    const { uid } = action.payload;
    // find the notification object from the state by id
    const notification = notifications.find(n => n.id === uid);
    // change notification's isVisible to true
    const newNotifications = notifications.map(n => (n.id === uid ? { ...n, isVisible: true } : n));
    return loop(
      // pass on changed state
      { ...state, notifications: newNotifications },
      // wait [notification.delay] milliseconds and then run removeNotification action
      Cmd.run(wait, {
        successActionCreator: actions.removeNotification,
        // these args are passed to wait and then to the removeNotification action
        args: [notification.delay, uid],
      })
    );
  },
}, initialState);
