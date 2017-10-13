import { loop, Cmd } from 'redux-loop';
import { push, LOCATION_CHANGED } from 'redux-little-router';
import { tpl } from '../../locale';
import reducer, { actions } from './PlanForm.ducks';
import { savePlans } from './model';
import { actions as NotificationActions } from '../Notifications';
import * as ROUTES from '../../constants/routes';

describe('savePlan action', () => {
  it('should set error to null', () => {
    const state = { error: new Error('error') };
    const payload = {};
    const result = reducer(state, actions.savePlan(payload));
    expect(result[0].error).toEqual(undefined);
  });

  it('should send project to the server', () => {
    const state = {};
    const payload = {};
    const result = reducer(state, actions.savePlan(payload));
    expect(result).toEqual(loop(
      state,
      Cmd.run(savePlans, {
        successActionCreator: actions.planSaveSuccessAction,
        failActionCreator: actions.planFailAction,
        args: [payload],
      }))
    );
  });
});

describe('savePlan success action', () => {
  it('should wrap payload in an array', () => {
    const action = actions.planSaveSuccessAction({});
    expect(action.payload instanceof Array).toBe(true);
  });

  it('should return an array', () => {
    const action = actions.planSaveSuccessAction([{}]);
    expect(action.payload.length).toBe(1);
  });

  it('should return state unmodified', () => {
    const state = { router: { params: { projectId: 123 } } };
    const payload = {};
    const result = reducer(state, actions.planSaveSuccessAction([[payload], []]));
    expect(result[0]).toBe(state);
  });

  it('should navigate to project details page', () => {
    const projectId = 123;
    const state = {};
    const values = [{ projectId, subNo: 1, mainNo: 1 }, { projectId, subNo: 2, mainNo: 1 }];
    const action = actions.planSaveSuccessAction([values, []]);
    const result = reducer(state, action);
    expect(result).toEqual(loop(
      state,
      Cmd.list([
        Cmd.action(NotificationActions.addSuccessNotification(
          tpl('plan.message.save_success_multiple', { count: values.length })
        )),
        Cmd.action(push(`/project/${projectId}`)),
      ])
    ));
  });

  it('should navigate to project details page and display a success notification with a single plan as payload', () => {
    const projectId = 123;
    const state = {};
    const values = { projectId, subNo: 1, mainNo: 1 };
    const action = actions.planSaveSuccessAction([[values], []]);
    const result = reducer(state, action);
    expect(result).toEqual(loop(
      state,
      Cmd.list([
        Cmd.action(NotificationActions.addSuccessNotification(
          tpl('plan.message.save_success', { subNo: 1, mainNo: 1 })
        )),
        Cmd.action(push(`/project/${projectId}`)),
      ])
    ));
  });
});

describe('savePlan fail action', () => {
  it('should add error the state', () => {
    const state = {};
    const payload = new Error();
    const result = reducer(state, actions.planFailAction(payload));
    expect(result.error).toBe(payload);
  });

  it('should not modify current state', () => {
    const state = {};
    const payload = new Error();
    const result = reducer(state, actions.planFailAction(payload));
    expect(result).not.toBe(state);
  });
});

describe('navigation to the form page', () => {
  it('should clear error from state', () => {
    const state = { error: new Error() };
    const action = { type: LOCATION_CHANGED, payload: { route: ROUTES.PLAN, params: {} } };
    const result = reducer(state, action);
    expect(result.error).toBe();
  });

  it('should not discard other state members', () => {
    const state = { error: new Error(), a: 1 };
    const action = { type: LOCATION_CHANGED, payload: { route: ROUTES.PLAN, params: {} } };
    const result = reducer(state, action);
    expect(result.a).toBe(state.a);
  });

  it('should not change state if error not defined in previous state', () => {
    const state = {};
    const action = { type: LOCATION_CHANGED, payload: { route: ROUTES.PLAN, params: {} } };
    const result = reducer(state, action);
    expect(result).toBe(state);
  });

  it('should not change state if error is already undefined', () => {
    const state = {};
    const action = { type: LOCATION_CHANGED, payload: { route: ROUTES.PLAN, params: {} } };
    const result = reducer(state, action);
    expect(result).toBe(state);
  });

  it('should not change state if route is other than edit or create project route', () => {
    const state = { error: new Error() };
    const action = { type: LOCATION_CHANGED, payload: { route: '/', params: {} } };
    const result = reducer(state, action);
    expect(result).toBe(state);
  });

  it('should change state if route is add project route', () => {
    const state = { error: new Error() };
    const action = { type: LOCATION_CHANGED, payload: { route: ROUTES.PLAN, params: {} } };
    const result = reducer(state, action);
    expect(result).not.toBe(state);
  });

  it('should change state if route is edit project route', () => {
    const state = { error: new Error() };
    const action = { type: LOCATION_CHANGED, payload: { route: ROUTES.EDIT_PLAN, params: {} } };
    const result = reducer(state, action);
    expect(result).not.toBe(state);
  });
});
