import { loop, Cmd } from 'redux-loop';
import { push, LOCATION_CHANGED } from 'redux-little-router';
import reducer, { actions } from './ProjectForm-ducks';
import { saveProject } from './model';
import * as ROUTES from '../../constants/routes';

describe('saveProject action', () => {
  it('should set error to null', () => {
    const state = { error: new Error('error') };
    const payload = {};
    const result = reducer(state, actions.saveProject(payload));
    expect(result[0].error).toEqual(undefined);
  });

  it('should send project to the server', () => {
    const state = {};
    const payload = {};
    const result = reducer(state, actions.saveProject(payload));
    expect(result).toEqual(loop(
      state,
      Cmd.run(saveProject, {
        successActionCreator: actions.projectSuccessAction,
        failActionCreator: actions.projectFailAction,
        args: [payload],
      }))
    );
  });
});

describe('saveProject success action', () => {
  it('should return state unmodified', () => {
    const state = {};
    const payload = { id: 123 };
    const result = reducer(state, actions.projectSuccessAction(payload));
    expect(result[0]).toBe(state);
  });

  it('should navigate to project details page', () => {
    const state = {};
    const payload = { id: 123 };
    const result = reducer(state, actions.projectSuccessAction(payload));
    expect(result).toEqual(loop(
      state,
      Cmd.action(push(`/project/${payload.projectId}`))
    ));
  });
});

describe('savePlan fail action', () => {
  it('should add error the state', () => {
    const state = {};
    const payload = new Error();
    const result = reducer(state, actions.projectFailAction(payload));
    expect(result.error).toBe(payload);
  });

  it('should not modify current state', () => {
    const state = {};
    const payload = new Error();
    const result = reducer(state, actions.projectFailAction(payload));
    expect(result).not.toBe(state);
  });
});

describe('navigation to the form page', () => {
  it('should clear error from state', () => {
    const state = { error: new Error() };
    const action = { type: LOCATION_CHANGED, payload: { route: ROUTES.PROJECT, params: {} } };
    const result = reducer(state, action);
    expect(result.error).toBe();
  });

  it('should not discard other state members', () => {
    const state = { error: new Error(), a: 1 };
    const action = { type: LOCATION_CHANGED, payload: { route: ROUTES.PROJECT, params: {} } };
    const result = reducer(state, action);
    expect(result.a).toBe(state.a);
  });

  it('should not change state if error not defined in previous state', () => {
    const state = {};
    const action = { type: LOCATION_CHANGED, payload: { route: ROUTES.PROJECT, params: {} } };
    const result = reducer(state, action);
    expect(result).toBe(state);
  });

  it('should not change state if error is already undefined', () => {
    const state = {};
    const action = { type: LOCATION_CHANGED, payload: { route: ROUTES.PROJECT, params: {} } };
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
    const action = { type: LOCATION_CHANGED, payload: { route: ROUTES.PROJECT, params: {} } };
    const result = reducer(state, action);
    expect(result).not.toBe(state);
  });

  it('should change state if route is edit project route', () => {
    const state = { error: new Error() };
    const action = { type: LOCATION_CHANGED, payload: { route: ROUTES.EDIT_PROJECT, params: {} } };
    const result = reducer(state, action);
    expect(result).not.toBe(state);
  });
});
