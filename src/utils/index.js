import R from 'ramda';
import t from '../locale';
import { ServerResponseError } from './ajax';

/**
 * Pick a key from object when test function returns a truthy value
 * @param {function} fn test function
 * @return {function}
 */
const pickKeysWhen = fn =>
  /**
   * @param {string[]} keys A list of object keys
   * @param {object} obj Object to pick keys and values from
   * @return {object}
   */
  (keys, obj) => (keys && keys.length
    ? Object.getOwnPropertyNames(obj)
      .sort((a, b) => keys.indexOf(a) - keys.indexOf(b))
      .reduce((acc, key) => (fn(key, keys)
        ? { ...acc, [key]: obj[key] }
        : acc), {})
    : obj);

/**
 * Remove object members by object keys without mutating the object. For example:
 * const obj = { a: 1, b: 2, c: 3 };
 * omit(['a', 'b'], obj) will then return { c: 3 }
 * obj is still { a: 1, b: 2, c: 3 }
 * @param {string[]} keys
 * @param {object} obj
 */
export const omit = pickKeysWhen((key, keys) => keys.indexOf(key) === -1);


/**
 * Pick object members by object keys without mutating the object. For example:
 * const obj = { a: 1, b: 2, c: 3 };
 * pick(['a', 'b'], obj) will then return { a: 1, b: 2 }
 * obj is still { a: 1, b: 2, c: 3 }
 * @param {string[]} keys
 * @param {object} obj
 */
export const pick = pickKeysWhen((key, keys) => keys.indexOf(key) > -1);

/**
 * Wait given time and successfully resolve the returned promise
 * @param {number} time
 * @param {*[]} rest
 * @return {Promise}
 */
export const wait = (time = 0, ...rest) =>
  new Promise(resolve => setTimeout(() => resolve(...rest), time));

/**
 * Check if given value is null or undefined
 * @param {*} value
 * @return {boolean}
 */
export const isNil = value => value === null || value === undefined;

/**
 * Function that returns the value given as parameter
 * @param {*} value
 * @return {*}
 */
export const identity = value => value;

/**
 * Create a promise race that will reject if given promise doesn't
 * resolve before the timeout promise rejects
 * @param {number} timeout Timeout in milliseconds
 * @param {...Promise} promises
 */
export const withTimeout = (timeout, ...promises) => Promise.race([
  ...promises,
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new ServerResponseError(t('network.error.timeout'), 0)), timeout)),
]);

/**
 * Check if needle is found in haystack
 * @param {*} needle
 * @param {*[]} haystack
 * @return {boolean}
 */
export const isOneOf = (needle, haystack = []) => haystack.indexOf(needle) > -1;

/**
 * Check if string is a url (starts with http(s))
 * @param {string} value
 * @return {string}
 */
export const isURL = value => /^http(s?):\/\//.test(value);

/**
 * Parse file name from a url
 * @param {string} url
 * @return {string} file name
 */
export const parseFileNameFromURL = url => url.substring(url.lastIndexOf('/') + 1);

/**
 * Create array sorter that sorts
 * @param {string} propName
 */
export const propSorter = propName => (a, b) => {
  const { [propName]: aProp } = a;
  const { [propName]: bProp } = b;
  if (aProp === bProp) return 0;
  if (!(propName in b) || aProp > bProp) return -1;
  return 1;
};

/** Convert map to a list
 * @param {object} obj
 * @return {*[]}
 */
export const mapToList = obj => Object.getOwnPropertyNames(obj).map(key => obj[key]);

/**
 * Convert list to map using obj[prop] as key
 * @param {string} prop
 * @param {object[]} list
 * @return {object}
 */
export const listToMapBy = R.curry((prop, list) =>
  list.reduce((acc, obj) => ({ ...acc, [obj[prop]]: obj }), {}));

/**
 * Check if given value is a number (but not a NaN)
 * @param {*} value
 * @return {boolean}
 */
export const isNumber = value => !isNaN(Number(value));

/**
 * Check if given value is a string
 * @param {*} value
 * @return {boolean}
 */
export const isString = value => typeof value === 'string';

/**
 * Map number to corresponding version character (0 => A, 1 => B...)
 * @param {number} number
 * @param {string}
 */
export const versionToCharacter = number => String.fromCharCode(65 + Number(number));

/**
 * Get given props from an object and concatenate them into a string
 * @param {string[]} props
 * @param {string} props
 */
export const concatProps = props => R.pipe(R.props(props), R.map(String), R.reduce(R.concat, ''));

/**
 * Format date to a human readable form
 * @param {number} date
 * @return {string}
 */
export const serverDateToString = () => new Date(1999, 1, 1, 12, 12);
