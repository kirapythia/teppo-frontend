import reducer from './plans.ducks';
import * as PlanForm from '../components/PlanForm';
import * as ProjectDetails from '../components/ProjectDetails';

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

describe('Plan edit success', () => {
  it('should replace the current object in the byId mapping', () => {
    const plan = { planId: '1' };
    const initialState = { 1: { planId: '1' } };
    const action = PlanForm.actions.planEditSuccessAction(plan);
    const actual = reducer(initialState, action);
    expect(actual['1']).toBe(plan);
  });

  it('should not discard other entries in the byId mapping', () => {
    const plan1 = { planId: '1' };
    const plan2 = { planId: '2' };
    const initialState = { 2: plan2 };
    const action = PlanForm.actions.planEditSuccessAction(plan1);
    const actual = reducer(initialState, action);
    expect(actual['2']).toBe(initialState['2']);
  });

  it('should not mutate state object', () => {
    const plan = {};
    const initialState = { plansById: {} };
    const action = PlanForm.actions.planEditSuccessAction(plan);
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

