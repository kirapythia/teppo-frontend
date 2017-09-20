import fetchMock from 'fetch-mock';
import t from '../../locale';
import { saveProject, SAVE_PROJECT_URL } from './model';

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
