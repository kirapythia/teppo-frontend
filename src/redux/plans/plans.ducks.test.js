import * as R from 'ramda';
import { Cmd, loop } from 'redux-loop';
import { createPlan, removePlan, updatePlan } from './model';
import reducer, { actions, actionTypes } from './plans.ducks';
import PLAN_STATUS from '../../constants/plan-status';
import * as PlanForm from '../../components/PlanForm';
import * as ProjectDetails from '../../components/ProjectDetails';

describe('Save plan success', () => {
  it('should not mutate state object', () => {
    const plan = {};
    const initialState = { plansById: {} };
    const action = PlanForm.actions.planSaveSuccessAction(plan);
    const actual = reducer(initialState, action);
    expect(actual).not.toBe(initialState);
  });

  it('should update the byId mapping', () => {
    const plan = { planId: '1' };
    const initialState = {};
    const action = PlanForm.actions.planSaveSuccessAction(plan);
    const actual = reducer(initialState, action);
    expect(actual['1']).toBe(plan);
  });

  it('should not discard other entries in the byId mapping', () => {
    const plan1 = { planId: '1' };
    const plan2 = { planId: '2' };
    const initialState = { 2: plan2 };
    const action = PlanForm.actions.planSaveSuccessAction(plan1);
    const actual = reducer(initialState, action);
    expect(actual['2']).toBe(initialState['2']);
  });

  it('should not mutate the original byId object', () => {
    const plan = { planId: '1' };
    const initialState = {};
    const action = PlanForm.actions.planSaveSuccessAction(plan);
    const actual = reducer(initialState, action);
    expect(actual).not.toBe(initialState);
  });
});

describe('Fetch project success action', () => {
  it('should add plan from project to the byId mapping', () => {
    const project = { plans: [{ planId: '1' }] };
    const initialState = {};
    const action = ProjectDetails.actions.fetchProjectSuccess(project);
    const actual = reducer(initialState, action);
    expect(actual['1']).toBe(project.plans[0]);
  });

  it('should add all plans from project to the byId mapping', () => {
    const project = { plans: [{ planId: '1' }, { planId: '2' }] };
    const initialState = {};
    const action = ProjectDetails.actions.fetchProjectSuccess(project);
    const actual = reducer(initialState, action);
    expect(actual['1']).toBe(project.plans[0]);
    expect(actual['2']).toBe(project.plans[1]);
  });

  it('should not keep previous entries', () => {
    const project = { plans: [{ planId: '1' }] };
    const initialState = { 3: { planId: 3 } };
    const action = ProjectDetails.actions.fetchProjectSuccess(project);
    const actual = reducer(initialState, action);
    expect(actual['3']).toBe();
  });

  it('should not mutate the original state', () => {
    const project = { plans: [{ planId: '1' }] };
    const initialState = {};
    const action = ProjectDetails.actions.fetchProjectSuccess(project);
    const actual = reducer(initialState, action);
    expect(actual).not.toBe(initialState);
  });
});

describe('Approving a plan', () => {
  describe('approve plan action', () => {
    it('should have a type', () => {
      expect(actions.approvePlan().type).toEqual(actionTypes.UPDATE_PLAN);
    });

    it('should pass plan as payload', () => {
      const plan = {};
      const update = { status: PLAN_STATUS.APPROVED };
      expect(actions.approvePlan(plan).payload).toEqual(update);
    });
  });

  describe('approve plan success action', () => {
    it('should have a type', () => {
      expect(actions.updatePlanSuccess().type).toEqual(actionTypes.UPDATE_PLAN_SUCCESS);
    });

    it('should pass plan as payload', () => {
      const plan = {};
      expect(actions.updatePlanSuccess(plan).payload).toBe(plan);
    });
  });

  describe('approve plan success action', () => {
    it('should have a type', () => {
      expect(actions.updatePlanError().type).toEqual(actionTypes.UPDATE_PLAN_ERROR);
    });

    it('should pass error as payload', () => {
      const error = new Error();
      expect(actions.updatePlanError(error).payload).toBe(error);
    });
  });

  describe('approve plan handler', () => {
    it('should return a state object', () => {
      const state = {};
      expect(reducer(state, {})).toEqual({});
    });

    it('should update the plan object', () => {
      const plan = { status: PLAN_STATUS.WAITING_FOR_APPROVAL };
      const action = actions.approvePlan(plan);
      const actual = reducer(undefined, action);
      expect(actual).toEqual(loop(
        actual[0],
        Cmd.run(updatePlan, {
          successActionCreator: actions.updatePlanSuccess,
          failActionCreator: actions.updatePlanError,
          args: [{ ...plan, status: PLAN_STATUS.APPROVED }],
        })
      ));
    });

    it('should not discard other state members', () => {
      const action = actions.approvePlan();
      const state = { isApproving: true, a: 1 };
      const [actual] = reducer(state, action);
      expect(actual.a).toEqual(state.a);
    });

    it('should return the original state', () => {
      const action = actions.approvePlan();
      const state = { isApproving: true };
      const [actual] = reducer(state, action);
      expect(actual).toBe(state);
    });
  });
});

describe('Removing a plan', () => {
  describe('Remove plan action', () => {
    it('should have a type', () => {
      expect(actions.removePlan().type).toEqual(actionTypes.REMOVE_PLAN);
    });

    it('should have a plan as payload', () => {
      const plan = {};
      expect(actions.removePlan(plan).payload).toBe(plan);
    });
  });

  describe('Remove plan success action', () => {
    it('should have a type', () => {
      expect(actions.removePlanSuccess().type).toEqual(actionTypes.REMOVE_PLAN_SUCCESS);
    });

    it('should have a plan as payload', () => {
      const plan = {};
      expect(actions.removePlanSuccess(plan).payload).toBe(plan);
    });
  });

  describe('Remove plan handler', () => {
    it('should remove plan from the server', () => {
      const plan = {};
      const action = actions.removePlan(plan);
      const actual = reducer(undefined, action);
      expect(actual).toEqual(loop(
        actual[0],
        Cmd.run(removePlan, {
          successActionCreator: actions.removePlanSuccess,
          failActionCreator: actions.removePlanError,
          args: [plan],
        })
      ));
    });

    it('should not modify state', () => {
      const action = actions.removePlan();
      const state = {};
      const [actual] = reducer(state, action);
      expect(actual).toBe(state);
    });
  });

  describe('Remove plan success handler', () => {
    it('should remove plan from the list of plans', () => {
      const plan = { planId: 1 };
      const state = { 1: {} };
      const action = actions.removePlanSuccess(plan);
      const actual = reducer(state, action);
      expect(actual).toEqual({});
    });

    it('should not remove other plans', () => {
      const plan = { planId: 1 };
      const state = { 1: {}, 2: {} };
      const action = actions.removePlanSuccess(plan);
      const actual = reducer(state, action);
      expect(actual['2']).not.toBe(undefined);
    });
  });
});

describe('Creating a new version of a plan', () => {
  describe('create new version action', () => {
    it('should have a type', () => {
      expect(actions.createNewPlanVersion().type).toEqual(actionTypes.CREATE_NEW_PLAN_VERSION);
    });

    it('should have a plan as payload', () => {
      const plan = {};
      expect(actions.removePlan(plan).payload).toBe(plan);
    });
  });

  describe('handling a create new version action', () => {
    it('should call create plan action with selected props', () => {
      const plan = { mainNo: '8001', subNo: '2001', version: 2, projectId: '1' };
      const action = actions.createNewPlanVersion(plan);
      const actual = reducer(undefined, action);
      const expectedArgs = R.pick(['mainNo', 'subNo', 'projectId'], plan);

      expect(actual).toEqual(loop(
        actual[0],
        Cmd.run(createPlan, {
          successActionCreator: actions.createNewPlanVersionSuccess,
          failActionCreator: actions.updatePlanError,
          args: [expectedArgs],
        })
      ));
    });
  });
});
