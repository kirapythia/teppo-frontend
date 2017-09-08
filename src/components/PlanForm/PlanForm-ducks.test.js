import { loop, Cmd } from 'redux-loop';
import { push } from 'redux-little-router';
import reducer, { actions } from './PlanForm-ducks';
import { savePlan } from './model';

describe('savePlan action', () => {
  it('should set error to null', () => {
    const state = { error: new Error('error') };
    const payload = {};
    const result = reducer(state, actions.savePlan(payload));
    expect(result[0].error).toEqual(null);
  });

  it('should send project to the server', () => {
    const state = { error: null };
    const payload = {};
    const result = reducer(state, actions.savePlan(payload));
    expect(result).toEqual(loop(
      state,
      Cmd.run(savePlan, {
        successActionCreator: actions.savePlanSuccessAction,
        failActionCreator: actions.savePlanFailAction,
        args: [payload],
      }))
    );
  });
});

describe('savePlan success action', () => {
  it('should return state unmodified', () => {
    const state = { router: { params: { projectId: 123 } } };
    const payload = {};
    const result = reducer(state, actions.savePlanSuccessAction(payload));
    expect(result[0]).toBe(state);
  });

  it('should navigate to project details page', () => {
    const projectId = 123;
    const state = { router: { params: { projectId } } };
    const payload = {};
    const result = reducer(state, actions.savePlanSuccessAction(payload));
    expect(result).toEqual(loop(
      state,
      Cmd.action(push(`/project/${projectId}`))
    ));
  });
});

describe('savePlan fail action', () => {
  it('should add error the state', () => {
    const state = {};
    const payload = new Error();
    const result = reducer(state, actions.savePlanFailAction(payload));
    expect(result.error).toBe(payload);
  });

  it('should not modify current state', () => {
    const state = {};
    const payload = new Error();
    const result = reducer(state, actions.savePlanFailAction(payload));
    expect(result).not.toBe(state);
  });
});

