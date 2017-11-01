import * as utils from './index';
import t from '../locale';

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

describe('zeroPad', () => {
  it('should return a string', () => {
    expect(utils.zeroPad('212', 3)).toEqual('212');
  });

  it('should zeroPad value to the given length', () => {
    expect(utils.zeroPad('1', 1)).toEqual('1');
    expect(utils.zeroPad('1', 2)).toEqual('01');
    expect(utils.zeroPad('1', 3)).toEqual('001');
  });

  it('should zeroPad value if it is a number', () => {
    expect(utils.zeroPad(1, 1)).toEqual('1');
    expect(utils.zeroPad(1, 2)).toEqual('01');
    expect(utils.zeroPad(1, 3)).toEqual('001');
  });

  it('should return given string unmodified if minLength is less than 1', () => {
    expect(utils.zeroPad('212', 0)).toEqual('212');
    expect(utils.zeroPad('212', -1)).toEqual('212');
  });
});
