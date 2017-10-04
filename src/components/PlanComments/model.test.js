import fetchMock from 'fetch-mock';
import t from '../../locale';
import { editComment, saveComment } from './model';
import { ServerResponseError } from '../../utils/ajax';

const SAVE_URL_MATCHER = /^\/pythia\/v1\/projects\/\d+\/plans\/\d+\/comments\//;
const EDIT_URL_MATCHER = /^\/pythia\/v1\/projects\/\d+\/plans\/\d+\/comments\/\d+/;

describe('Saving a comment', () => {
  afterEach(() => fetchMock.restore());

  it('should post to the save comment url', () => {
    const plan = { planId: 2, projectId: 1 };
    const url = `/pythia/v1/projects/${plan.projectId}/plans/${plan.planId}/comments/`;
    fetchMock.post(url, { ok: true });
    return saveComment(plan);
  });

  it('should post the given comment', () => {
    const plan = { planId: 2, projectId: 1 };
    const comment = { text: 'Comment text' };
    fetchMock.post(SAVE_URL_MATCHER, { ok: true });

    return saveComment(plan, comment)
      .then(() => {
        const [, options] = fetchMock.lastCall(SAVE_URL_MATCHER);
        expect(options.body).toEqual(JSON.stringify(comment));
      });
  });

  it('should resolve promise with comment received from the server', () => {
    const comment = {};
    const plan = { planId: 2, projectId: 1 };
    const response = new Promise(resolve => resolve(comment));
    fetchMock.post(SAVE_URL_MATCHER, response);
    return saveComment(plan).then(result => expect(result).toEqual(comment));
  });

  it('should reject promise with an error when request fails', () => {
    fetchMock.post(SAVE_URL_MATCHER, 400);
    const plan = { planId: 2, projectId: 1 };
    return saveComment(plan).catch(err => expect(err instanceof ServerResponseError).toEqual(true));
  });

  it('should reject promise with an error containing response status', () => {
    const expected = 403;
    fetchMock.post(SAVE_URL_MATCHER, expected);
    const plan = { planId: 2, projectId: 1 };
    return saveComment(plan).catch(err => expect(err.status).toEqual(expected));
  });

  it('should reject with an error containing a message', () => {
    const expected = t('network.error.comment.save');
    const plan = { planId: 2, projectId: 1 };
    fetchMock.post(SAVE_URL_MATCHER, 404);
    return saveComment(plan).catch(err => expect(err.message).toEqual(expected));
  });
});


describe('Updating a comment', () => {
  afterEach(() => fetchMock.restore());

  it('should put to the update url', () => {
    const plan = { planId: 2, projectId: 1 };
    const comment = { commentId: 3 };
    const url = `/pythia/v1/projects/${plan.projectId}/plans/${plan.planId}/comments/${comment.commentId}`;
    fetchMock.put(url, { ok: true });
    return editComment(plan, comment);
  });

  it('should post the given comment', () => {
    const plan = { planId: 2, projectId: 1 };
    const comment = { commentId: 3, text: 'Comment text' };
    fetchMock.put(EDIT_URL_MATCHER, { ok: true });

    return editComment(plan, comment)
      .then(() => {
        const [, options] = fetchMock.lastCall(EDIT_URL_MATCHER);
        expect(options.body).toEqual(JSON.stringify(comment));
      });
  });

  it('should reject promise with the corresponding comment', () => {
    fetchMock.put(EDIT_URL_MATCHER, 400);
    const plan = { planId: 2, projectId: 1 };
    const comment = { commentId: 3 };
    return editComment(plan, comment)
      .catch(([c]) => expect(c).toBe(comment));
  });

  it('should reject promise with an error when request fails', () => {
    fetchMock.put(EDIT_URL_MATCHER, 400);
    const plan = { planId: 2, projectId: 1 };
    const comment = { commentId: 3 };
    return editComment(plan, comment)
      .catch(([, err]) => expect(err instanceof ServerResponseError).toEqual(true));
  });

  it('should reject promise with an error containing response status', () => {
    const expected = 403;
    const plan = { planId: 2, projectId: 1 };
    const comment = { commentId: 3 };
    fetchMock.put(EDIT_URL_MATCHER, expected);
    return editComment(plan, comment).catch(([, err]) => expect(err.status).toEqual(expected));
  });

  it('should reject with an error containing a message', () => {
    const expected = t('network.error.comment.edit');
    const plan = { planId: 2, projectId: 1 };
    const comment = { commentId: 3 };
    fetchMock.put(EDIT_URL_MATCHER, 404);
    return editComment(plan, comment).catch(([, err]) => expect(err.message).toEqual(expected));
  });
});

