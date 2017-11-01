import reducer, { actions } from './FileUploadDialog.ducks';

describe('Uploading a file', () => {
  it('should set current file to batch data', () => {
    const key = 'form';
    const file = { name: 'filename.pdf' };
    const action = actions.uploadFile(key, file, '');
    const state = { [key]: {} };
    const [result] = reducer(state, action);
    expect(result[key].currentFile).toBe(file);
  });

  it('should not mutate the batch data object', () => {
    const key = 'form';
    const action = actions.uploadFile(key, { name: 'filename.pdf' }, '');
    const state = { [key]: {} };
    const result = reducer(state, action);
    expect(result[key]).not.toBe(state[key]);
  });

  it('should not mutate the state', () => {
    const key = 'form';
    const action = actions.uploadFile(key, { name: 'filename.pdf' }, '');
    const state = { [key]: {} };
    const result = reducer(state, action);
    expect(result).not.toBe(state);
  });
});

describe('Batch end', () => {
  it('should mark batch done', () => {
    const key = 'form';
    const action = actions.endBatch(key);
    const state = { [key]: {} };
    const result = reducer(state, action);
    expect(result[key]).toEqual({ isBatchDone: true });
  });

  it('should not mutate the batch data object', () => {
    const key = 'form';
    const action = actions.endBatch(key);
    const state = { [key]: {} };
    const result = reducer(state, action);
    expect(result[key]).not.toBe(state[key]);
  });

  it('should not mutate the state', () => {
    const key = 'form';
    const action = actions.endBatch(key);
    const state = { [key]: {} };
    const result = reducer(state, action);
    expect(result).not.toBe(state);
  });
});

