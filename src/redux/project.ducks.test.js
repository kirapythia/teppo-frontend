import reducer from './project.ducks';
import * as ProjectDetails from '../components/ProjectDetails';

describe('Project fetch, edit or save success', () => {
  it('should add project to the state', () => {
    const project = { projectId: 1 };
    const action = ProjectDetails.actions.fetchProjectSuccess(project);
    expect(reducer(undefined, action)).toEqual(project);
  });

  it('should omit plans from project', () => {
    const project = { projectId: 1 };
    const action = ProjectDetails.actions.fetchProjectSuccess(project);
    expect(reducer(undefined, action)).toEqual(project);
  });

  it('should not mutate the state', () => {
    const project = { projectId: 1 };
    const initialState = {};
    const action = ProjectDetails.actions.fetchProjectSuccess(project);
    expect(reducer(initialState, action)).toEqual(project);
  });
});
