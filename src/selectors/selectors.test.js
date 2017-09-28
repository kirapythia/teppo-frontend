import * as selectors from './index';

describe('getCurrentProjectId', () => {
  it('should return undefined if router params is not defined', () => {
    const state = { router: {} };
    expect(selectors.getCurrentProjectId(state)).toEqual(undefined);
  });

  it('should return undefined if projectId in router params is not defined', () => {
    const state = { router: { params: {} } };
    expect(selectors.getCurrentProjectId(state));
  });

  it('should return current id from router params', () => {
    const expected = '123';
    const state = { router: { params: { projectId: expected } } };
    expect(selectors.getCurrentProjectId(state)).toEqual(expected);
  });
});

describe('getCurrentProject', () => {
  it('should return undefined if router params has no projectId', () => {
    const state = { router: {} };
    const actual = selectors.getCurrentProject(state);
    expect(actual).toEqual();
  });

  it('should return undefined if router params has no projectId but project is defined', () => {
    const state = { router: {}, project: { projectId: '123' } };
    const actual = selectors.getCurrentProject(state);
    expect(actual).toEqual();
  });

  it('should return undefined if state has no project', () => {
    const state = { router: { params: { projectId: '123' } } };
    const actual = selectors.getCurrentProject(state);
    expect(actual).toEqual();
  });

  it('should return undefined if current project id does not matche the project\'s id', () => {
    const state = { project: { projectId: '456' }, router: { params: { projectId: '123' } } };
    const actual = selectors.getCurrentProject(state);
    expect(actual).toEqual();
  });

  it('should return the project if current project id matches the project\'s id', () => {
    const project = { projectId: 123 };
    const state = { project, router: { params: { projectId: '123' } } };
    const actual = selectors.getCurrentProject(state);
    expect(actual).toEqual(project);
  });
});

describe('getCurrentPlan', () => {
  it('should return undefined if router params has no projectId', () => {
    const state = { router: {} };
    const actual = selectors.getCurrentPlan(state);
    expect(actual).toEqual();
  });

  it('should return undefined if router params has no planId', () => {
    const state = { router: { params: { projectId: '123' } } };
    const actual = selectors.getCurrentPlan(state);
    expect(actual).toEqual();
  });

  it('should return undefined if router params has no projectId but project is defined', () => {
    const state = { router: {}, project: { projectId: '123' } };
    const actual = selectors.getCurrentPlan(state);
    expect(actual).toEqual();
  });

  it('should return undefined if state has no project', () => {
    const state = { router: { params: { projectId: '123' } } };
    const actual = selectors.getCurrentPlan(state);
    expect(actual).toEqual();
  });

  it('should return undefined if current project id does not match the project\'s id', () => {
    const state = { project: { projectId: '456' }, router: { params: { projectId: '123' } } };
    const actual = selectors.getCurrentPlan(state);
    expect(actual).toEqual();
  });

  it('should return undefined if project has no plan with current plan id', () => {
    const project = { projectId: 1, plans: [{ planId: 5 }] };
    const state = { project, router: { params: { projectId: '1', planId: '4' } } };
    const actual = selectors.getCurrentPlan(state);
    expect(actual).toEqual();
  });

  it('should return plan with given id from project', () => {
    const plan = { planId: 4 };
    const project = { projectId: 1 };
    const state = { project, plans: { [plan.planId]: plan }, router: { params: { projectId: '1', planId: '4' } } };
    const actual = selectors.getCurrentPlan(state);
    expect(actual).toEqual(plan);
  });
});

describe('listPlans', () => {
  it('should return an empty list if plans is an empty object', () => {
    const state = { plans: {} };
    const actual = selectors.listPlans(state);
    expect(actual).toEqual([]);
  });

  it('should return plan in a list', () => {
    const state = { plans: { 1: {} } };
    const actual = selectors.listPlans(state);
    expect(actual.length).toEqual(1);
    expect(actual[0]).toBe(state.plans['1']);
  });

  it('should return all plans in a list', () => {
    const state = { plans: { 1: {}, 2: {} } };
    const actual = selectors.listPlans(state);
    expect(actual.length).toEqual(2);
  });
});

