import fetchMock from 'fetch-mock';
import t, { tpl } from '../../locale';
import { fetchProject } from './model';

const URL_MATCHER = /^\/pythia\/\.*/;

describe('Fetching a project', () => {
  afterEach(() => fetchMock.restore());

  it('should return a promise', () => {
    fetchMock.get(URL_MATCHER, { ok: true });
    expect(fetchProject()).toBeInstanceOf(Promise);
  });

  it('should resolve promise when fetch succeeds', () => {
    fetchMock.get(URL_MATCHER, { ok: true });
    return fetchProject();
  });

  it('should resolve promise with project', () => {
    const project = { projectId: 1 };
    const response = new Promise(resolve => resolve(project));
    fetchMock.get(URL_MATCHER, response);
    return fetchProject().then(resolved => expect(resolved).toEqual(project));
  });

  it('should reject promise with a error object when fetch fails with status 404', () => {
    fetchMock.get(URL_MATCHER, 404);
    return fetchProject().catch(err => expect(err.type).toEqual('ResourceNotFoundError'));
  });

  it('should reject with an error containing a not found message when failing with status 404', () => {
    const projectId = 1;
    const expected = tpl('network.error.project.not_found', { projectId });
    fetchMock.get(URL_MATCHER, 404);
    return fetchProject(projectId).catch(err => expect(err.message).toEqual(expected));
  });

  it('should reject promise with an Error when fetch fails with other status than 404', () => {
    fetchMock.get(URL_MATCHER, 401);
    return fetchProject().catch(err => expect(err.type).toEqual('Error'));
  });

  it('should reject with an error containing a general message when failing with other status than 404', () => {
    const expected = t('network.error.project.fetch');
    fetchMock.get(URL_MATCHER, 401);
    return fetchProject().catch(err => expect(err.message).toEqual(expected));
  });
});
