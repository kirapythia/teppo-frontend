import { Cmd, loop } from 'redux-loop';
import { push } from 'redux-little-router';
import { actions } from '../../redux/plans';
import reducer from './PlanDetails.ducks';

describe('Approving a plan', () => {
  describe('approve plan handler', () => {
    it('should return a state object', () => {
      const state = {};
      expect(reducer(state, {})).toEqual({});
    });

    it('should set isApproving to true', () => {
      const action = actions.approvePlan({});
      const actual = reducer(undefined, action);
      expect(actual.isApproving).toEqual(true);
    });

    it('should not discard other state members', () => {
      const action = actions.approvePlan();
      const state = { isApproving: true, a: 1 };
      const actual = reducer(state, action);
      expect(actual.a).toEqual(state.a);
    });

    it('should not mutate the original state', () => {
      const action = actions.approvePlan();
      const state = { isApproving: true };
      const actual = reducer(state, action);
      expect(actual).not.toBe(state);
    });
  });

  describe('Approve plan success handler', () => {
    it('should mark isApproving to false', () => {
      const action = actions.approvePlanSuccess();
      const actual = reducer({ isApproving: true }, action);
      expect(actual.isApproving).toEqual(false);
    });

    it('should not discard other state members', () => {
      const action = actions.approvePlanSuccess();
      const state = { isApproving: true, a: 1 };
      const actual = reducer(state, action);
      expect(actual.a).toEqual(state.a);
    });

    it('should not mutate the original state', () => {
      const action = actions.approvePlanSuccess();
      const state = { isApproving: false };
      const actual = reducer(state, action);
      expect(actual).not.toBe(state);
    });
  });

  describe('Approve plan error handler', () => {
    it('should mark isApproving to false', () => {
      const action = actions.approvePlanError();
      const actual = reducer({ isApproving: true }, action);
      expect(actual.isApproving).toEqual(false);
    });

    it('should add error to the state', () => {
      const error = new Error();
      const action = actions.approvePlanError(error);
      const actual = reducer(undefined, action);
      expect(actual.error).toEqual(error);
    });

    it('should not discard other state members', () => {
      const action = actions.approvePlanError();
      const state = { isApproving: true, a: 1 };
      const actual = reducer(state, action);
      expect(actual.a).toEqual(state.a);
    });

    it('should not mutate the original state', () => {
      const action = actions.approvePlanError();
      const state = { isApproving: false };
      const actual = reducer(state, action);
      expect(actual).not.toBe(state);
    });
  });
});

describe('Removing a plan', () => {
  describe('Remove plan action handler', () => {
    it('should mark isRemoving to true', () => {
      const action = actions.removePlan();
      const actual = reducer({ isRemoving: false }, action);
      expect(actual.isRemoving).toEqual(true);
    });

    it('should not discard other state members', () => {
      const action = actions.removePlan();
      const state = { isRemoving: true, a: 1 };
      const actual = reducer(state, action);
      expect(actual.a).toEqual(state.a);
    });

    it('should not mutate the original state', () => {
      const action = actions.removePlan();
      const state = { isRemoving: false };
      const actual = reducer(state, action);
      expect(actual).not.toBe(state);
    });
  });

  describe('Remove plan success action handler', () => {
    it('should mark isRemoving to false', () => {
      const action = actions.removePlanSuccess();
      const [actual] = reducer({ isRemoving: true }, action);
      expect(actual.isRemoving).toEqual(false);
    });

    it('should not discard other state members', () => {
      const action = actions.removePlanSuccess();
      const state = { isRemoving: true, a: 1 };
      const [actual] = reducer(state, action);
      expect(actual.a).toEqual(state.a);
    });

    it('should not mutate the original state', () => {
      const action = actions.removePlanSuccess();
      const state = { isRemoving: false };
      const [actual] = reducer(state, action);
      expect(actual).not.toBe(state);
    });

    it('should navigate back to the project details page', () => {
      const plan = { projectId: 1 };
      const action = actions.removePlanSuccess(plan);
      const actual = reducer(undefined, action);
      expect(actual).toEqual(loop(
        actual[0],
        Cmd.action(push(`/project/${plan.projectId}`)),
      ));
    });
  });

  describe('Remove plan error handler', () => {
    it('should mark isRemoving to false', () => {
      const action = actions.removePlanError();
      const actual = reducer({ isRemoving: true }, action);
      expect(actual.isRemoving).toEqual(false);
    });

    it('should add error to the state', () => {
      const error = new Error();
      const action = actions.removePlanError(error);
      const actual = reducer(undefined, action);
      expect(actual.error).toEqual(error);
    });

    it('should not discard other state members', () => {
      const action = actions.removePlanError();
      const state = { isRemoving: true, a: 1 };
      const actual = reducer(state, action);
      expect(actual.a).toEqual(state.a);
    });

    it('should not mutate the original state', () => {
      const action = actions.removePlanError();
      const state = { isRemoving: false };
      const actual = reducer(state, action);
      expect(actual).not.toBe(state);
    });
  });
});
