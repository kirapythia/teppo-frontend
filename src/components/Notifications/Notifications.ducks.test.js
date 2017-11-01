import { loop, Cmd } from 'redux-loop';
import reducer, { actions } from './Notifications.ducks';
import constants from './constants';
import { wait } from '../../utils';

it('should have no initial notifications', () => {
  expect(reducer(undefined, {}).notifications).toEqual([]);
});

it('should have nextId of 1', () => {
  expect(reducer(undefined, {}).nextId).toEqual(1);
});

describe('Add notification', () => {
  it('should add a message to the state', () => {
    const state = { nextId: 1, notifications: [] };
    const action = actions.addSuccessNotification('myMessage');
    const [result] = reducer(state, action);
    expect(result.notifications).toEqual([{ ...action.payload, id: state.nextId }]);
  });

  it('should add an success message to the state', () => {
    const state = { nextId: 1, notifications: [] };
    const action = actions.addSuccessNotification('myMessage');
    const [result] = reducer(state, action);
    expect(result.notifications[0].type).toEqual(constants.SUCCESS);
  });

  it('should add a warning message to the state', () => {
    const state = { nextId: 1, notifications: [] };
    const action = actions.addWarningNotification('myMessage');
    const [result] = reducer(state, action);
    expect(result.notifications[0].type).toEqual(constants.WARNING);
  });

  it('should add a warning message to the state', () => {
    const state = { nextId: 1, notifications: [] };
    const action = actions.addErrorNotification('myMessage');
    const [result] = reducer(state, action);
    expect(result.notifications[0].type).toEqual(constants.DANGER);
  });

  it('should add id to the message from sequence', () => {
    const state = { nextId: 1, notifications: [] };
    const [result] = reducer(state, actions.addSuccessNotification('message'));
    expect(result.notifications[0].id).toEqual(state.nextId);
  });

  it('should increase nextId', () => {
    const state = { nextId: 1, notifications: [] };
    const [result] = reducer(state, actions.addSuccessNotification('message'));
    expect(result.nextId).toEqual(state.nextId + 1);
  });

  it('should not modify state', () => {
    const state = { nextId: 1, notifications: [] };
    const [result] = reducer(state, actions.addSuccessNotification('message'));
    expect(result.notifications).not.toBe(state.notifications);
  });

  it('should show messages after a delay', () => {
    const nextId = 1;
    const state = { nextId, notifications: [] };
    const result = reducer(state, actions.addSuccessNotification('message'));
    expect(result).toEqual(loop(
      result[0],
      Cmd.run(wait, {
        successActionCreator: actions.showNotification,
        args: [50, nextId],
      }))
    );
  });
});

describe('Remove notification', () => {
  it('should remove message from the state', () => {
    const state = { notifications: [{ id: 1 }] };
    const result = reducer(state, actions.removeNotification(1));
    expect(result.notifications.length).toEqual(0);
  });

  it('should not remove other messages', () => {
    const state = { notifications: [{ id: 1 }, { id: 2 }] };
    const result = reducer(state, actions.removeNotification(1));
    expect(result.notifications.length).toEqual(1);
  });

  it('should return original state if notification w/ given id was not found', () => {
    const state = { notifications: [{ id: 1 }] };
    const result = reducer(state, actions.removeNotification(2));
    expect(result.notifications).toBe(state.notifications);
  });

  it('should not modify state', () => {
    const state = { notifications: [{ id: 1 }] };
    const result = reducer(state, actions.removeNotification(1));
    expect(result.notifications).not.toBe(state.notifications);
  });
});

describe('Clear all notifications', () => {
  it('clear all notifications', () => {
    const state = { notifications: [{ id: 1 }] };
    const result = reducer(state, actions.clearNotifications());
    expect(result.notifications.length).toEqual(0);
  });

  it('should return original state if notifications are already empty', () => {
    const state = { notifications: [] };
    const result = reducer(state, actions.clearNotifications());
    expect(result.notifications).toBe(state.notifications);
  });

  it('should not modify state', () => {
    const state = { notifications: [{ id: 1 }] };
    const result = reducer(state, actions.clearNotifications());
    expect(result.notifications).not.toBe(state.notifications);
  });
});


describe('Show notification', () => {
  it('should set notification\'s isVisible true', () => {
    const state = { notifications: [{ id: 1, isVisible: false }] };
    const [result] = reducer(state, actions.showNotification(1));
    expect(result.notifications[0].isVisible).toEqual(true);
  });

  it('should hide message after some delay', () => {
    const notification = { id: 1, isVisible: false, delay: 3000 };
    const state = { notifications: [notification] };
    const result = reducer(state, actions.showNotification(notification.id));
    expect(result).toEqual(loop(
      result[0],
      Cmd.run(wait, {
        successActionCreator: actions.removeNotification,
        args: [notification.delay, state.notifications[0].id],
      })
    ));
  });

  it('should not modify state', () => {
    const state = { notifications: [{ id: 1, isVisible: false }] };
    const result = reducer(state, actions.showNotification(1));
    expect(result).not.toBe(state);
  });

  it('should not modify notifications array', () => {
    const state = { notifications: [{ id: 1, isVisible: false }] };
    const result = reducer(state, actions.showNotification(1));
    expect(result.notifications).not.toBe(state.notifications);
  });
});
