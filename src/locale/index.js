import lang from './fi.json';

/**
 * Get string from dictionary by key
 * @param {string} key
 * @return {string}
 */
const t = key => (lang[key] || '____');

const replaceKeyWithValue = (str, [key, value]) => str.replace(new RegExp(`\\\${${key}}`, 'g'), value);

/**
 * Get string from the dictionary and replace all template literals
 * with given values
 * @param {string} key Dicitionary key
 * @param {object} values Object containing values used for replacements
 * @return {string}
 */
export const tpl = (key, values = {}) =>
  Object.keys(values)
    .map(name => [name, values[name]])
    .reduce(replaceKeyWithValue, t(key));

export default t;
