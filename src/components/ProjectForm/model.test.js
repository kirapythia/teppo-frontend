import fetchMock from 'fetch-mock';
import t from '../../locale';
import { ServerResponseError } from '../../utils/ajax';
import {
  saveProject,
  validateHansuProjectId,
  SAVE_PROJECT_URL,
  FETCH_PROJECT_BY_HANSU_PROJECT_ID_URL,
} from './model';

describe('Saving a project', () => {
  afterEach(() => fetchMock.restore());

  it('should return a promise', () => {
    fetchMock.post(SAVE_PROJECT_URL, {});
    expect(saveProject({})).toBeInstanceOf(Promise);
  });

  it('should resolve promise when fetch succeeds', () => {
    fetchMock.post(SAVE_PROJECT_URL, { ok: true });
    return saveProject();
  });

  it('should resolve promise with project', () => {
    const project = { projectId: 1 };
    const response = new Promise(resolve => resolve(project));
    fetchMock.post(SAVE_PROJECT_URL, response);
    return saveProject().then(resolved => expect(resolved).toEqual(project));
  });

  it('should reject promise with a error object when fetch fails', () => {
    fetchMock.post(SAVE_PROJECT_URL, 404);
    return saveProject().catch(err => expect(err).toBeInstanceOf(Error));
  });

  it('should reject promise with an error with message when fetch fails', () => {
    fetchMock.post(SAVE_PROJECT_URL, 401);
    return saveProject().catch(err => expect(err.message).toEqual(t('network.error.project.create')));
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
