import { Cmd, loop } from 'redux-loop';
import { push } from 'redux-little-router';
import { tpl } from '../../locale';
import { actions } from '../../redux/plans';
import { actions as Notifications } from '../Notifications';
import reducer from './PlanDetails.ducks';

describe('Approving a plan', () => {
  describe('approve plan handler', () => {
    it('should return a state object', () => {
      const state = {};
      expect(reducer(state, {})).toEqual({});
    });

    it('should set isFetching to true', () => {
      const action = actions.approvePlan({});
      const actual = reducer(undefined, action);
      expect(actual.isFetching).toEqual(true);
    });

    it('should not discard other state members', () => {
      const action = actions.approvePlan();
      const state = { isFetching: true, a: 1 };
      const actual = reducer(state, action);
      expect(actual.a).toEqual(state.a);
    });

    it('should not mutate the original state', () => {
      const action = actions.approvePlan();
      const state = { isFetching: true };
      const actual = reducer(state, action);
      expect(actual).not.toBe(state);
    });
  });

  describe('Approve plan success handler', () => {
    it('should mark isFetching to false', () => {
      const action = actions.updatePlanSuccess({});
      const [actual] = reducer({ isFetching: true }, action);
      expect(actual.isFetching).toEqual(false);
    });

    it('should not discard other state members', () => {
      const action = actions.updatePlanSuccess({});
      const state = { isFetching: true, a: 1 };
      const [actual] = reducer(state, action);
      expect(actual.a).toEqual(state.a);
    });

    it('should not mutate the original state', () => {
      const action = actions.updatePlanSuccess({});
      const state = { isFetching: false };
      const [actual] = reducer(state, action);
      expect(actual).not.toBe(state);
    });

    it('should display a success notification', () => {
      const plan = { mainNo: '123', subNo: '435' };
      const action = actions.updatePlanSuccess(plan);
      const actual = reducer(undefined, action);
      expect(actual).toEqual(loop(
        actual[0],
        Cmd.batch([
          Cmd.action(Notifications.addSuccessNotification(
            tpl('plan.message.update_success', { mainNo: plan.mainNo, subNo: plan.subNo })
          )),
        ])
      ));
    });
  });

  describe('Approve plan error handler', () => {
    it('should mark isFetching to false', () => {
      const action = actions.updatePlanError({});
      const actual = reducer({ isFetching: true }, action);
      expect(actual.isFetching).toEqual(false);
    });

    it('should add error to the state', () => {
      const error = new Error();
      const action = actions.updatePlanError(error);
      const actual = reducer(undefined, action);
      expect(actual.error).toEqual(error);
    });

    it('should not discard other state members', () => {
      const action = actions.updatePlanError();
      const state = { isFetching: true, a: 1 };
      const actual = reducer(state, action);
      expect(actual.a).toEqual(state.a);
    });

    it('should not mutate the original state', () => {
      const action = actions.updatePlanError();
      const state = { isFetching: false };
      const actual = reducer(state, action);
      expect(actual).not.toBe(state);
    });
  });
});

describe('Removing a plan', () => {
  describe('Remove plan action handler', () => {
    it('should mark isFetching to true', () => {
      const action = actions.removePlan();
      const actual = reducer({ isFetching: false }, action);
      expect(actual.isFetching).toEqual(true);
    });

    it('should not discard other state members', () => {
      const action = actions.removePlan();
      const state = { isFetching: true, a: 1 };
      const actual = reducer(state, action);
      expect(actual.a).toEqual(state.a);
    });

    it('should not mutate the original state', () => {
      const action = actions.removePlan();
      const state = { isFetching: false };
      const actual = reducer(state, action);
      expect(actual).not.toBe(state);
    });
  });

  describe('Remove plan success action handler', () => {
    it('should mark isFetching to false', () => {
      const action = actions.removePlanSuccess({});
      const [actual] = reducer({ isFetching: true }, action);
      expect(actual.isFetching).toEqual(false);
    });

    it('should not discard other state members', () => {
      const action = actions.removePlanSuccess({});
      const state = { isFetching: true, a: 1 };
      const [actual] = reducer(state, action);
      expect(actual.a).toEqual(state.a);
    });

    it('should not mutate the original state', () => {
      const action = actions.removePlanSuccess({});
      const state = { isFetching: false };
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
    it('should mark isFetching to false', () => {
      const action = actions.removePlanError();
      const actual = reducer({ isFetching: true }, action);
      expect(actual.isFetching).toEqual(false);
    });

    it('should add error to the state', () => {
      const error = new Error();
      const action = actions.removePlanError(error);
      const actual = reducer(undefined, action);
      expect(actual.error).toEqual(error);
    });

    it('should not discard other state members', () => {
      const action = actions.removePlanError();
      const state = { isFetching: true, a: 1 };
      const actual = reducer(state, action);
      expect(actual.a).toEqual(state.a);
    });

    it('should not mutate the original state', () => {
      const action = actions.removePlanError();
      const state = { isFetching: false };
      const actual = reducer(state, action);
      expect(actual).not.toBe(state);
    });
  });
});

describe('Creating a new plan version', () => {
  describe('create plan handler', () => {
    it('should set isFetching to true', () => {
      const action = actions.createNewPlanVersion({});
      const actual = reducer(undefined, action);
      expect(actual.isFetching).toEqual(true);
    });
  });

  describe('Approve plan success handler', () => {
    it('should mark isFetching to false', () => {
      const action = actions.createNewPlanVersionSuccess({});
      const [actual] = reducer({ isFetching: true }, action);
      expect(actual.isFetching).toEqual(false);
    });

    it('should display a success notification and navigate to new page', () => {
      const plan = { projectId: '4', planId: '5', mainNo: '123', subNo: '435' };
      const action = actions.createNewPlanVersionSuccess(plan);
      const actual = reducer(undefined, action);
      expect(actual).toEqual(loop(
        actual[0],
        Cmd.batch([
          Cmd.action(Notifications.addSuccessNotification(
            tpl('plan.message.update_success', { mainNo: plan.mainNo, subNo: plan.subNo })
          )),
          Cmd.action(push(`/project/${plan.projectId}/plan/${plan.planId}`)),
        ])
      ));
    });
  });
});

