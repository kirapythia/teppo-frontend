import * as selectors from './selectors';

describe('listComments', () => {
  it('should return an empty list if plans is an empty object', () => {
    const state = { comments: { comments: {} } };
    const actual = selectors.listComments(state);
    expect(actual).toEqual([]);
  });

  it('should return plan in a list', () => {
    const comments = { 1: {} };
    const state = { comments: { comments } };
    const actual = selectors.listComments(state);
    expect(actual.length).toEqual(1);
    expect(actual[0]).toBe(comments['1']);
  });

  it('should return all plans in a list', () => {
    const comments = { 1: {}, 2: {} };
    const state = { comments: { comments } };
    const actual = selectors.listComments(state);
    expect(actual.length).toEqual(2);
  });
});

describe('getCommentsForCurrentPlan', () => {
  it('should return only files of a plan', () => {
    const comments = { 1: { planId: 1 }, 2: { planId: 2 } };
    const state = { comments: { comments }, router: { params: { planId: 1 } } };
    const actual = selectors.getCommentsForCurrentPlan(state);
    expect(actual.length).toEqual(1);
  });

  it('should not throw if comments is empty', () => {
    const state = { comments: { comments: {} }, router: { params: { planId: 1 } } };
    const actual = selectors.getCommentsForCurrentPlan(state);
    expect(actual.length).toEqual(0);
  });
});

describe('getSortedComments', () => {
  it('should sort primarily on approved property', () => {
    const comments = { 1: { planId: 1, approved: false }, 2: { planId: 1, approved: true } };
    const state = { comments: { comments }, router: { params: { planId: 1 } } };
    const actual = selectors.getSortedComments(state);
    expect(actual[0]).toEqual(comments['2']);
  });

  it('should sort secondarily on createAt property', () => {
    const comments = {
      1: { textId: 1, planId: 1, approved: true, createdAt: '2017-10-12T13:35:14.591Z' },
      2: { textId: 2, planId: 1, approved: true, createdAt: '2017-08-10T13:35:14.591Z' },
      3: { textId: 3, planId: 1, approved: true, createdAt: '2017-09-11T12:35:14.591Z' },
    };

    const state = { comments: { comments }, router: { params: { planId: 1 } } };
    const actual = selectors.getSortedComments(state);

    expect(actual[0]).toEqual(comments['2']);
    expect(actual[1]).toEqual(comments['3']);
    expect(actual[2]).toEqual(comments['1']);
  });

  it('should not throw if comments is undefined', () => {
    const state = { comments: { comments: {} }, router: { params: { planId: 1 } } };
    const actual = selectors.getSortedComments(state);
    expect(actual.length).toEqual(0);
  });
});

