import * as R from 'ramda';
import t from '../locale';
import { ServerResponseError } from './ajax';

/**
 * Wait given time and successfully resolve the returned promise
 * @param {number} time
 * @param {*[]} rest
 * @return {Promise}
 */
export const wait = (time = 0, ...rest) =>
  new Promise(resolve => setTimeout(() => resolve(...rest), time));

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
export const parseFileNameFromURL = (url = '') => url.substring(url.lastIndexOf('/') + 1);

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
export const isNumber = value => !Number.isNaN(Number(value));

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
export const versionToCharacter = (number = 0) => String.fromCharCode(65 + Number(number));

/**
 * Get given props from an object and concatenate them into a string
 * @param {string[]} propNames
 * @return {string}
 */
export const concatProps = propNames => R.pipe(R.props(propNames), R.map(String), R.reduce(R.concat, ''));

/**
 * Pad number with zeros
 * @param {number|string} value
 * @param {number} minLength
 * @return {string}
 */
export const zeroPad = (value, minLength) =>
  `${R.repeat('0', Math.max(0, minLength - String(value).length)).join('')}${value}`;


/**
 * Form plan identifier from main and sub number
 * @param {object} plan
 * @return {string}
 */
export const formPlanIdentifierText = plan => `${plan.mainNo}/${zeroPad(plan.subNo, 3)}`;

/**
 * Form a identifier by concatenating projectId, mainNo and subNo
 * @private
 * @param {object} plan
 * @return {function} A function that returns a string when applied on a plan object
 */
export const formPlanIdentifier = R.pipe(
  // subNo has to be zero padded because when fetched from the server the type is number
  // but from the form it is zero padded string
  R.mapObjIndexed((value, key) => (key === 'subNo' ? zeroPad(value, 3) : value)),
  concatProps(['projectId', 'mainNo', 'subNo'])
);

/**
 * Get all non null file urls from a plan
 * @param {object} plan
 * @return {string[]}
 */
export const getPlanFileUrls = R.pipe(
  R.props(['pdfUrl', 'xmlUrl', 'dwgUrl']),
  R.filter(Boolean),
);

/**
 * Get all non null file names from a plan
 * @param {object} plan
 * @return {string[]}
 */
export const getPlanFileNames = R.pipe(
  getPlanFileUrls,
  R.map(parseFileNameFromURL),
);

const dateOptions = {
  weekday: 'short',
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
};

const timeOptions = {
  hour: '2-digit',
  minute: '2-digit',
};

/**
 * Format date to a human readable form
 * @param {string} str
 * @return {string}
 */
export const serverDateToString = (str) => {
  const date = new Date(str);
  return `${date.toLocaleDateString('fi-FI', dateOptions)} ${date.toLocaleTimeString('fi-FI', timeOptions)}`;
};

/**
 * Append slug to a base url
 * @private
 * @param {string} url
 * @param {string} slug
 * @return {string}
 */
const appendSlug = (url, slug) => `${url}${slug ? `/${slug}` : ''}`;

/**
 * Form url for a project
 * @param {number|string} projectId
 * @param {string} [slug]
 * @return {string}
 */
export const formProjectUrl = (projectId = '', slug = '') => appendSlug(`/project/${projectId}`, slug);

/**
 * Form url for a plan
 * @param {number|string} projectId
 * @param {number|string} planId
 * @param {string} [slug]
 * @return {string}
 */
export const formPlanUrl = (projectId, planId = '', slug = '') => appendSlug(`${formProjectUrl(projectId)}/plan/${planId}`, slug);

// call given fn only when enter is pressed
export const filterEnter = fn => e => (e.key === 'Enter' && fn());
