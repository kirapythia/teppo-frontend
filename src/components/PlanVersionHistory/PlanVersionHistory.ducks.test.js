import { Cmd, loop } from 'redux-loop';
import reducer, { actions } from './PlanVersionHistory.ducks';
import * as model from './model';

describe('Toggle plan history', () => {
  it('should fetch plan history', () => {
    const plan = { projectId: 1 };
    const action = actions.togglePlanHistory(plan);
    const result = reducer(undefined, action);
    expect(result).toEqual(loop(
      result[0],
      Cmd.action(actions.fetchPlanHistory(plan)),
    ));
  });

  it('should change toggle state to true', () => {
    const plan = { projectId: 1 };
    const action = actions.togglePlanHistory(plan);
    const result = reducer(undefined, action);
    expect(result[0].isToggled).toBe(true);
  });

  it('should change toggle state to false', () => {
    const plan = { projectId: 1 };
    const initialState = { isToggled: true };
    const action = actions.togglePlanHistory(plan);
    const result = reducer(initialState, action);
    expect(result.isToggled).toEqual(false);
  });
});

describe('Fetching plan history', () => {
  it('should fetch history', () => {
    const plan = { projectId: 1 };
    const action = actions.fetchPlanHistory(plan);
    const result = reducer(undefined, action);
    expect(result).toEqual(loop(
      result[0],
      Cmd.run(model.fetchPlanHistory, {
        successActionCreator: actions.fetchPlanHistorySuccess,
        failActionCreator: actions.fetchPlanHistoryError,
        args: [action.payload],
      })));
  });

  it('should set fetching to true', () => {
    const plan = { projectId: 1 };
    const action = actions.fetchPlanHistory(plan);
    const [result] = reducer(undefined, action);
    expect(result.isFetching).toBe(true);
  });
});

