import t from '../../locale';
import { fetchProject } from './model';

describe('Fetching a project', () => {
  it('should return a promise', () => {
    fetch.mockResponseOnce('{}', { ok: true, status: 200 });
    expect(fetchProject()).toBeInstanceOf(Promise);
  });

  it('should resolve promise when fetch succeeds', () => {
    fetch.mockResponseOnce('{}', { ok: true, status: 200 });
    return fetchProject();
  });

  it('should resolve promise with project', () => {
    const project = { projectId: 1 };
    fetch.mockResponseOnce(JSON.stringify(project), { ok: true, status: 200 });
    return fetchProject().then(resolved => expect(resolved).toEqual(project));
  });

  it('should reject promise with an error object containing the response status', () => {
    fetch.mockResponseOnce('{}', { ok: false, status: 404 });
    return fetchProject().catch(err => expect(err.status).toEqual(404));
  });

  it('should reject with an error containing a general message when failing with other status than 404', () => {
    const expected = t('network.error.project.fetch');
    fetch.mockResponseOnce('{}', { ok: false, status: 400 });
    return fetchProject().catch(err => expect(err.message).toEqual(expected));
  });
});
