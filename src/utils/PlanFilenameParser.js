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
const isValidMainNo = (value = 0) => value && +value >= 2000;

/**
 * Parse subNo from the filename
 * @private
 * @param {string} value Filename without the mainNo
 * @return {string|undefined}
 */
const isValidSubNo = (value = 0) => value && isBetween(1, 1199, +value);

const PLAN_FILENAME_EXP = /^(\d{4,})_(\d{3,4})([a-z]{1,2})?(_\d)?\.(pdf|xml|dwg)$/i;

/**
 * Check if filename is a valid plan file's name
 * @param {string} filename
 * @return {boolean}
 */
export const isValidPlanFilename = (filename = '') => {
  const match = filename.match(PLAN_FILENAME_EXP);
  return !!(match && isValidMainNo(+match[1]) && isValidSubNo(+match[2]));
};

/**
 * Parse mainNo and subNo from the filename
 * @param {string} value Filename
 * @return {object} Object containing mainNo and subNo as properties
 */
export const parsePlanProps = (value = '') => {
  const match = value.match(PLAN_FILENAME_EXP) || [];
  const mainNo = isValidMainNo(match[1]) && match[1];
  const subNo = isValidSubNo(match[2]) && match[2];
  // only pick values that are not falsy
  return R.pickBy(Boolean, { mainNo, subNo });
};

