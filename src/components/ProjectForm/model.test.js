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
  it('should return a promise', () => {
    fetch.mockResponseOnce('{}', { ok: true, status: 200 });
    expect(saveProject({})).toBeInstanceOf(Promise);
  });

  it('should resolve promise when fetch succeeds', () => {
    fetch.mockResponseOnce('{}', { ok: true, status: 200 });
    return saveProject();
  });

  it('should resolve promise with project', () => {
    const project = { projectId: 1 };
    fetch.mockResponseOnce(JSON.stringify(project), { ok: true, status: 200 });
    return saveProject().then(resolved => expect(resolved).toEqual(project));
  });

  it('should reject promise with a error object when fetch fails', () => {
    fetch.mockResponseOnce('{}', { ok: false, status: 404 });
    return saveProject().catch(err => expect(err).toBeInstanceOf(Error));
  });

  it('should reject promise with an error with message when fetch fails', () => {
    fetch.mockResponseOnce('{}', { ok: false, status: 401 });
    return saveProject().catch(err => expect(err.message).toEqual(t('network.error.project.create')));
  });
});

describe('editing a project', () => {
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
    fetch.mockResponseOnce('{}', { ok: false, status: 400 });
    return editProject(project)
      .catch(err => expect(err instanceof Error).toBe(true));
  });

  it('should fail with an error message when request fails', () => {
    const project = { projectId: 1 };
    fetch.mockResponseOnce('{}', { ok: false, status: 200 });
    return editProject(project)
      .catch(err => expect(err.message).toEqual(t('network.error.project.edit')));
  });

  it('should resolve with the updated project', () => {
    const project = { projectId: 1 };
    fetch.mockResponseOnce(JSON.stringify(project), { ok: true, status: 200 });
    return editProject(project)
      .then(resolved => expect(resolved).toEqual(project));
  });

  it('should resolve when edit succeeds', () => {
    const project = { projectId: 123 };
    fetch.mockResponseOnce(JSON.stringify(project), { ok: true, status: 200 });
    return editProject(project);
  });
});

describe('Validating hansu project id', () => {
  it('should return a promise', () => {
    fetch.mockResponseOnce('{}', { ok: false, status: 400 });
    expect(validateHansuProjectId({ hansuProjectId: 1 })).toBeInstanceOf(Promise);
  });

  it('should resolve with undefined if server responds with status 404', () => {
    fetch.mockResponseOnce('{}', { ok: false, status: 400 });
    return validateHansuProjectId({ hansuProjectId: 1 })
      .then(result => expect(result).toEqual(undefined));
  });

  it('should throw if respose is 200 ok', () => {
    fetch.mockResponseOnce('{}', { ok: true, status: 200 });
    return validateHansuProjectId({ hansuProjectId: 1 }).catch((err) => {
      expect(err.hansuProjectId).toEqual(t('validation.message.hansu_project_id_used'));
    });
  });

  it('should throw if response is not ok and status is other than 404', () => {
    fetch.mockResponseOnce('{}', { ok: true, status: 500 });
    return validateHansuProjectId({ hansuProjectId: 1 })
      .catch(err => expect(err).toBeInstanceOf(ServerResponseError));
  });
});
