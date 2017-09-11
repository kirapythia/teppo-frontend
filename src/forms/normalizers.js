import { isNil } from '../utils';

export const stringToList = value => (value ? value.replace(/,\s/g, ',').split(/,\s?/) : []);
export const listToString = value => (value ? value.join(', ') : '');
/**
 * Convert string to number
 * @param {string} value
 * @return {number}
 */
export const toNumber = (value) => {
  const converted = Number(value);
  if (isNaN(converted)) return value;
  return isNil(value) || !value.length ? null : converted;
};
