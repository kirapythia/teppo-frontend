import { push, LOCATION_CHANGED } from 'redux-little-router';
import { loop, Cmd } from 'redux-loop';
import { NOT_FOUND_PAGE, PROJECT_DETAILS } from '../../constants/routes';
import reducer, { actions } from './ProjectDetails-ducks';
import { fetchProject } from './model';

describe('Location change', () => {
  it('should initiate project fetch when navigated to the project page', () => {
    const params = { projectId: '123' };
    const action = { type: LOCATION_CHANGED, payload: { route: PROJECT_DETAILS, params } };
    const state = {};
    const result = reducer(state, action);
    expect(result).toEqual(
      loop(
        state,
        Cmd.run(fetchProject, {
          successActionCreator: actions.fetchProjectSuccess,
          failActionCreator: actions.fetchProjectError,
          args: [params.projectId],
        })
      )
    );
  });

  it('should not intiate project fetch when navigated to page without projectId', () => {
    const action = { type: LOCATION_CHANGED, payload: { route: PROJECT_DETAILS, params: {} } };
    const state = {};
    const result = reducer(state, action);
    expect(result).toEqual(state);
  });

  it('should not crash if params is undefined', () => {
    const action = { type: LOCATION_CHANGED, payload: { route: '/testroute' } };
    const state = {};
    reducer(state, action);
  });

  it('should not change the state object when not navigating', () => {
    const action = { type: LOCATION_CHANGED, payload: { route: '/testroute', params: { } } };
    const state = {};
    const result = reducer(state, action);
    expect(result).toBe(state);
  });

  it('should not intiate project fetch when the project id in the url did not change', () => {
    const projectId = '123';
    const params = { projectId };
    const action = { type: LOCATION_CHANGED, payload: { route: PROJECT_DETAILS, params } };
    const state = { project: { projectId: +projectId } };
    const result = reducer(state, action);
    expect(result).toEqual(state);
  });
});

describe('Fetch project success', () => {
  it('should add error to the state', () => {
    const project = { projectId: 1 };
    const action = actions.fetchProjectSuccess(project);
    const result = reducer(undefined, action);
    expect(result.project).toBe(project);
  });

  it('should not erase other state properties', () => {
    const action = actions.fetchProjectSuccess({ projectId: 1 });
    const state = { a: 1 };
    const result = reducer(state, action);
    expect(result.a).toEqual(state.a);
  });

  it('should not mutate the state object', () => {
    const action = actions.fetchProjectSuccess({ projectId: 1 });
    const state = {};
    const result = reducer(state, action);
    expect(result).not.toBe(state);
  });

  it('should remove error from the state', () => {
    const action = actions.fetchProjectSuccess({ projectId: 1 });
    const state = { error: { type: 'Error', message: 'This is an error!' } };
    const result = reducer(state, action);
    expect(result.error).toEqual(undefined);
  });
});

describe('Fetch project error', () => {
  it('should add error to the state', () => {
    const error = { status: 500 };
    const action = actions.fetchProjectError(error);
    const result = reducer(undefined, action);
    expect(result.error).toBe(error);
  });

  it('should not erase other state properties', () => {
    const action = actions.fetchProjectError({ status: 500 });
    const state = { a: 1 };
    const result = reducer(state, action);
    expect(result.a).toEqual(state.a);
  });

  it('should not mutate the state object', () => {
    const action = actions.fetchProjectError({ status: 500 });
    const state = {};
    const result = reducer(state, action);
    expect(result).not.toBe(state);
  });

  it('should navigate to 404 page when the requested project was not found', () => {
    const action = actions.fetchProjectError({ status: 404 });
    const result = reducer(undefined, action);
    expect(result).toEqual(loop(
      result[0],
      Cmd.action(push(NOT_FOUND_PAGE))
    ));
  });
});
