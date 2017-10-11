import * as R from 'ramda';

/**
 * Check if a number is greater or equal than min and less or equal than max
 * @private
 * @param {number} min
 * @param {number} max
 * @param {number} value
 */
const isBetween = (min, max, value) => value >= min && value <= max;

/**
 * Parse mainNo from the filename
 * @private
 * @param {string} value Filename
 * @return {string|undefined}
 */
const parseMainNo = (value = '') => {
  const match = value.match(/(\d{4,})/g);
  return (match && match.find(m => +m >= 2000)) || undefined;
};

/**
 * Parse subNo from the filename
 * @private
 * @param {string} value Filename without the mainNo
 * @return {string|undefined}
 */
const parseSubNo = (value = '') => {
  const match = value.match(/(\d{3,4})[^\d]/);
  return match && isBetween(1, 1199, +match[1]) ? match[1] : undefined;
};

/**
 * Parse mainNo and subNo from the filename
 * @param {string} value Filename
 * @return {object} Object containing mainNo and subNo as properties
 */
export const parsePlanProps = (value = '') => {
  const mainNo = parseMainNo(value);
  const subNo = parseSubNo(value.replace(mainNo, ''));
  // if mainNo or subNo is undefined then do not include
  // the corresponding property in the return object
  return R.pickBy(Boolean, { mainNo, subNo });
};
