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

describe('getProjectAsSelectOptions', () => {
  const initState = (projects = []) => ({ router: { params: { projectId: '1' } }, projectList: { projects } });

  it('should return an empty array when there\'s no projects', () => {
    const state = { router: {}, projectList: {} };
    const actual = selectors.getProjectAsSelectOptions(state);
    expect(actual).toEqual([]);
  });

  it('should return an object containing value and label properties', () => {
    const project = { projectId: 2, hansuProjectId: 'H1234', name: 'Project1' };
    const state = initState([project]);
    const actual = selectors.getProjectAsSelectOptions(state);
    expect(actual[0]).toEqual({ label: `${project.hansuProjectId} - ${project.name}`, value: `${project.projectId}` });
  });

  it('should return as many items as there are projects', () => {
    const projects = [
      { projectId: 2 },
      { projectId: 3 },
    ];
    const state = initState(projects);
    const actual = selectors.getProjectAsSelectOptions(state);
    expect(actual.length).toEqual(projects.length);
  });

  it('should filter out the current project', () => {
    const projects = [
      { projectId: 1 },
      { projectId: 2 },
    ];
    const state = initState(projects);
    const actual = selectors.getProjectAsSelectOptions(state);
    expect(actual.length).toEqual(projects.length - 1);
  });

  it('should sort the projects by hansuProjectId', () => {
    const projects = [
      { projectId: 2, hansuProjectId: 'A123' },
      { projectId: 3, hansuProjectId: 'C999' },
      { projectId: 4, hansuProjectId: 'A999' },
    ];
    const state = initState(projects);
    const actual = selectors.getProjectAsSelectOptions(state);

    expect(actual[0].value).toEqual(String(projects[0].projectId));
    expect(actual[1].value).toEqual(String(projects[2].projectId));
    expect(actual[2].value).toEqual(String(projects[1].projectId));
  });
});
