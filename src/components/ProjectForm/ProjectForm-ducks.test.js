import { loop, Cmd } from 'redux-loop';
import { push } from 'redux-little-router';
import reducer, { actions } from './ProjectForm-ducks';
import { saveProject } from './model';

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

