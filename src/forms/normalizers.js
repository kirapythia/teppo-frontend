/**
 * A collection of value formatters
 * @module normalizers
 */

/**
 * Split a comma separated list of values into an array
 * @param {string} value
 * @return {string[]}
 */
export const stringToList = value => (value ? value.replace(/,\s/g, ',').split(/,\s?/) : []);
/**
 * Concatenate a list of values separating them with a comma and a space
 * @param {*[]} value
 * @return {string} value
 */
export const listToString = value => (value ? value.join(',') : '');

/**
 * Format a comma separated string list into an array of numbers
 * @param {*} value
 * @return {number[]}
 */
export const stringToNumberList = value => stringToList(value).map(Number);

/**
 * Strip tags from html input
 * @param {string} value
 * @return {string}
 */
export const stripTags = (value = '') => value.replace(/(<([^>]+)>)/ig, '');
