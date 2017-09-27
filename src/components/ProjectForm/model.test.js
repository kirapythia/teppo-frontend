import fetchMock from 'fetch-mock';
import t from '../../locale';
import { ServerResponseError } from '../../utils/ajax';
import {
  saveProject,
  editProject,
  validateHansuProjectId,
  PROJECT_URL,
  FETCH_PROJECT_BY_HANSU_PROJECT_ID_URL,
} from './model';

describe('Saving a project', () => {
  afterEach(() => fetchMock.restore());

  it('should return a promise', () => {
    fetchMock.post(PROJECT_URL, {});
    expect(saveProject({})).toBeInstanceOf(Promise);
  });

  it('should resolve promise when fetch succeeds', () => {
    fetchMock.post(PROJECT_URL, { ok: true });
    return saveProject();
  });

  it('should resolve promise with project', () => {
    const project = { projectId: 1 };
    const response = new Promise(resolve => resolve(project));
    fetchMock.post(PROJECT_URL, response);
    return saveProject().then(resolved => expect(resolved).toEqual(project));
  });

  it('should reject promise with a error object when fetch fails', () => {
    fetchMock.post(PROJECT_URL, 404);
    return saveProject().catch(err => expect(err).toBeInstanceOf(Error));
  });

  it('should reject promise with an error with message when fetch fails', () => {
    fetchMock.post(PROJECT_URL, 401);
    return saveProject().catch(err => expect(err.message).toEqual(t('network.error.project.create')));
  });
});

describe('editing a project', () => {
  afterEach(() => fetchMock.restore());

  it('should fail if given project has no projectId', () => {
    const project = {};
    return editProject(project).catch(err => expect(err instanceof Error).toBe(true));
  });

  it('should fail with an error message', () => {
    const project = {};
    return editProject(project)
      .catch(err => expect(err.message).toEqual(t('project.error.edit.no_id')));
  });

  it('should fail when request fails', () => {
    const project = { projectId: 1 };
    fetchMock.put(`${PROJECT_URL}${project.projectId}`, 400);
    return editProject(project)
      .catch(err => expect(err instanceof Error).toBe(true));
  });

  it('should fail with an error message when request fails', () => {
    const project = { projectId: 1 };
    fetchMock.put(`${PROJECT_URL}${project.projectId}`, 400);
    return editProject(project)
      .catch(err => expect(err.message).toEqual(t('network.error.project.edit')));
  });

  it('should resolve with the updated project', () => {
    const project = { projectId: 1 };
    const response = new Promise(resolve => resolve(project));
    fetchMock.put(`${PROJECT_URL}${project.projectId}`, response);
    return editProject(project)
      .then(resolved => expect(resolved).toEqual(project));
  });

  it('should resolve when edit succeeds', () => {
    const project = { projectId: 123 };
    const response = new Promise(resolve => resolve(project));
    fetchMock.put(`${PROJECT_URL}${project.projectId}`, response);
    return editProject(project);
  });
});

describe('Validating hansu project id', () => {
  afterEach(() => fetchMock.restore());

  it('should return a promise', () => {
    fetchMock.get(`${FETCH_PROJECT_BY_HANSU_PROJECT_ID_URL}1`, 404);
    expect(validateHansuProjectId({ hansuProjectId: 1 })).toBeInstanceOf(Promise);
  });

  it('should resolve with undefined if server responds with status 404', () => {
    fetchMock.get(`${FETCH_PROJECT_BY_HANSU_PROJECT_ID_URL}1`, 404);
    return validateHansuProjectId({ hansuProjectId: 1 })
      .then(result => expect(result).toEqual(undefined));
  });

  it('should throw if respose is 200 ok', () => {
    fetchMock.get(`${FETCH_PROJECT_BY_HANSU_PROJECT_ID_URL}1`, 200);
    return validateHansuProjectId({ hansuProjectId: 1 }).catch((err) => {
      expect(err.hansuProjectId).toEqual(t('validation.message.hansu_project_id_used'));
    });
  });

  it('should throw if response is not ok and status is other than 404', () => {
    fetchMock.get(`${FETCH_PROJECT_BY_HANSU_PROJECT_ID_URL}1`, 500);
    return validateHansuProjectId({ hansuProjectId: 1 })
      .catch(err => expect(err).toBeInstanceOf(ServerResponseError));
  });
});
