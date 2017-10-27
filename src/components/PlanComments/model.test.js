import t from '../../locale';
import { editComment, saveComment } from './model';
import { ServerResponseError } from '../../utils/ajax';

describe('Saving a comment', () => {
  it('should post to the save comment url', () => {
    const plan = { planId: 2, projectId: 1 };
    fetch.mockResponseOnce(JSON.stringify(plan), { ok: true, status: 200 });
    return saveComment(plan);
  });

  it('should post the given comment', () => {
    const plan = { planId: 2, projectId: 1 };
    const comment = { text: 'Comment text' };

    const call = fetch.mockResponseOnce(JSON.stringify(plan), { ok: true, status: 200 });

    return saveComment(plan, comment)
      .then(() => {
        const lastCall = call.mock.calls[call.mock.calls.length - 1];
        expect(lastCall[1].body).toEqual(JSON.stringify(comment));
      });
  });

  it('should resolve promise with comment received from the server', () => {
    const comment = {};
    const plan = { planId: 2, projectId: 1 };
    fetch.mockResponseOnce(JSON.stringify(comment), { ok: true, status: 200 });
    return saveComment(plan).then(result => expect(result).toEqual(comment));
  });

  it('should reject promise with an error when request fails', () => {
    fetch.mockResponseOnce('{}', { ok: false, status: 400 });
    const plan = { planId: 2, projectId: 1 };
    return saveComment(plan).catch(err => expect(err instanceof ServerResponseError).toEqual(true));
  });

  it('should reject promise with an error containing response status', () => {
    fetch.mockResponseOnce('{}', { ok: false, status: 400 });
    const plan = { planId: 2, projectId: 1 };
    return saveComment(plan).catch(err => expect(err.status).toEqual(400));
  });

  it('should reject with an error containing a message', () => {
    const expected = t('network.error.comment.save');
    const plan = { planId: 2, projectId: 1 };
    fetch.mockResponseOnce('{}', { ok: false, status: 404 });
    return saveComment(plan).catch((err) => {
      console.log(err);
      expect(err.message).toEqual(expected);
    });
  });
});


describe('Updating a comment', () => {
  it('should put to the update url', () => {
    const plan = { planId: 2, projectId: 1 };
    const comment = { textId: 3 };
    fetch.mockResponseOnce('{}', { ok: true, status: 200 });
    return editComment(plan, comment);
  });

  it('should post the given comment', () => {
    const plan = { planId: 2, projectId: 1 };
    const comment = { textId: 3, text: 'Comment text' };
    const call = fetch.mockResponseOnce('{}', { ok: true, status: 200 });

    return editComment(plan, comment)
      .then(() => {
        const lastCall = call.mock.calls[call.mock.calls.length - 1];
        expect(lastCall[1].body).toEqual(JSON.stringify(comment));
      });
  });

  it('should reject promise with an error when request fails', () => {
    const plan = { planId: 2, projectId: 1 };
    const comment = { textId: 3 };
    fetch.mockResponseOnce('{}', { ok: false, status: 400 });
    return editComment(plan, comment)
      .catch(err => expect(err instanceof ServerResponseError).toEqual(true));
  });

  it('should reject promise with an error containing response status', () => {
    const plan = { planId: 2, projectId: 1 };
    const comment = { textId: 3 };
    fetch.mockResponseOnce('{}', { ok: false, status: 403 });
    return editComment(plan, comment).catch(err => expect(err.status).toEqual(403));
  });

  it('should reject with an error containing a message', () => {
    const expected = t('network.error.comment.edit');
    const plan = { planId: 2, projectId: 1 };
    const comment = { textId: 3 };
    fetch.mockResponseOnce('{}', { ok: false, status: 404 });
    return editComment(plan, comment).catch(err => expect(err.message).toEqual(expected));
  });
});

