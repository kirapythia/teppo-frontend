import reducer from './project.reducer';
import * as ProjectDetails from '../../components/ProjectDetails';

describe('Project fetch, edit or save success', () => {
  it('should add project to the state', () => {
    const project = { projectId: 1, plans: [] };
    const action = ProjectDetails.actions.fetchProjectSuccess(project);
    expect(reducer(undefined, action)).toEqual(project);
  });

  it('should not mutate the state', () => {
    const project = { projectId: 1, plans: [] };
    const initialState = {};
    const action = ProjectDetails.actions.fetchProjectSuccess(project);
    expect(reducer(initialState, action)).toEqual(project);
  });

  it('should replace plans with an empty array', () => {
    const project = { projectId: 1, plans: [] };
    const initialState = {};
    const action = ProjectDetails.actions.fetchProjectSuccess(project);
    const actual = reducer(initialState, action);
    expect(actual.plans).toEqual([]);
  });
});
