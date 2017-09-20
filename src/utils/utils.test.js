import * as utils from './index';

describe('omit', () => {
  it('should remove given key from an object', () => {
    const obj = { a: 1, b: 2 };
    const actual = utils.omit(['a'], obj);
    expect('a' in actual).toEqual(false);
  });

  it('should keep keys not defined in list of omitted keys', () => {
    const obj = { a: 1, b: 2 };
    const actual = utils.omit(['a'], obj);
    expect('b' in actual).toEqual(true);
  });

  it('should remove all keys defined in given list', () => {
    const obj = { a: 1, b: 2 };
    const actual = utils.omit(['a', 'b'], obj);
    expect(actual).toEqual({});
  });

  it('should return object unmodified if given list is empty', () => {
    const obj = { a: 1, b: 2 };
    const actual = utils.omit([], obj);
    expect(actual).toBe(obj);
  });

  it('should return object unmodified if list is undefined', () => {
    const obj = { a: 1, b: 2 };
    const actual = utils.omit(undefined, obj);
    expect(actual).toBe(obj);
  });
});

describe('pick', () => {
  it('should pick given key from an object', () => {
    const obj = { a: 1, b: 2 };
    const actual = utils.pick(['a'], obj);
    expect('a' in actual).toEqual(true);
  });

  it('should not pick a key if it is not defined in the given list', () => {
    const obj = { a: 1, b: 2 };
    const actual = utils.pick(['a'], obj);
    expect('b' in actual).toEqual(false);
  });

  it('should pick all keys defined in given list', () => {
    const obj = { a: 1, b: 2 };
    const actual = utils.pick(['a', 'b'], obj);
    expect(actual).toEqual(obj);
  });

  it('should pick keys in order defined in the keys list', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const list = ['c', 'a', 'b'];
    const result = utils.pick(list, obj);
    const actual = Object.keys(result);
    expect(actual).toEqual(list);
  });

  it('should return object unmodified if given list is empty', () => {
    const obj = { a: 1, b: 2 };
    const actual = utils.pick([], obj);
    expect(actual).toBe(obj);
  });

  it('should return object unmodified if list is undefined', () => {
    const obj = { a: 1, b: 2 };
    const actual = utils.pick(undefined, obj);
    expect(actual).toBe(obj);
  });
});
