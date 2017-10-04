import * as utils from './index';
import t from '../locale';

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

describe('withTimeout', () => {
  it('should resolve with given promise if it resolves first', () => {
    const promise = new Promise(resolve => resolve(true));
    const timeoutPromise = utils.withTimeout(100, promise);
    return timeoutPromise.then(result => expect(result).toBe(true));
  });

  it('should take multiple promises and resolve with the one that resolves first', () => {
    const promise1 = new Promise(resolve => setTimeout(() => resolve(3), 30));
    const promise2 = new Promise(resolve => setTimeout(() => resolve(2), 20));
    const promise3 = new Promise(resolve => setTimeout(() => resolve(1), 10));

    const timeoutPromise = utils.withTimeout(100, promise1, promise2, promise3);
    return timeoutPromise.then(result => expect(result).toBe(1));
  });

  it('should reject if given promise does not resolve before the timeout', () => {
    const promise = new Promise(resolve => setTimeout(() => resolve(true), 10));
    const timeoutPromise = utils.withTimeout(0, promise);
    return timeoutPromise.catch(result => expect(result).not.toBe(true));
  });

  it('should reject with an error message if timeout rejects the promise', () => {
    const promise = new Promise(resolve => setTimeout(() => resolve(true), 10));
    const timeoutPromise = utils.withTimeout(0, promise);
    return timeoutPromise.catch(result => expect(result.message).toBe(t('network.error.timeout')));
  });
});

describe('propSorter', () => {
  it('should return -1 if object a\'s prop is greater than prop b\'s', () => {
    const a = { propName: 2 };
    const b = { propName: 1 };
    const sorter = utils.propSorter('propName');
    expect(sorter(a, b)).toEqual(-1);
  });

  it('should return 1 if object b\'s prop is greater than prop a\'s', () => {
    const a = { propName: 1 };
    const b = { propName: 2 };
    const sorter = utils.propSorter('propName');
    expect(sorter(a, b)).toEqual(1);
  });

  it('should return 0 if props of both objects are equal', () => {
    const a = { propName: 1 };
    const b = { propName: 1 };
    const sorter = utils.propSorter('propName');
    expect(sorter(a, b)).toEqual(0);
  });

  it('should return -1 if object b does not have given propName', () => {
    const a = { myProp: 1 };
    const b = {};
    const sorter = utils.propSorter('myProp');
    expect(sorter(a, b)).toEqual(-1);
  });

  it('should return 1 if object a does not have given propName', () => {
    const a = {};
    const b = { myProp: 1 };
    const sorter = utils.propSorter('myProp');
    expect(sorter(a, b)).toEqual(1);
  });

  it('should return 0 neither of objects has given propName', () => {
    const a = {};
    const b = {};
    const sorter = utils.propSorter('myProp');
    expect(sorter(a, b)).toEqual(0);
  });
});
