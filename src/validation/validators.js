import t, { tpl } from '../locale';
import { isNil, isNumber, isString } from '../utils';

/**
 * A set of validator function creators. Each validator takes rule value as first argument
 * and then returns an curried function whitch takes the actual value as a parameter. Validator
 * function will return an error string if validation fails and undefined if validation passes.
 * @namespace validators
 */

/**
 * Validator for value type. Will produce an error if value's type is wrong.
 * @param {string|number|integer} type
 * @return {function}
 */
export const type = requiredType => (value) => {
  switch (requiredType) {
    case 'string':
      return isNil(value) || isString(value) ? undefined : t('validation.message.type.string');
    case 'number':
      return isNil(value) || isNumber(value) ? undefined : t('validation.message.type.number');
    case 'integer':
      return isNumber(value) && Number.isInteger(value) ? undefined : t('validation.message.type.integer');
    case 'array':
      return !value || Array.isArray(value) ? undefined : t('validation.message.type.array');
    case 'alphanum':
      return !value || /^[a-zåäö0-9]*$/i.test(value) ? undefined : t('validation.message.type.alphanum');
    default:
      return true;
  }
};
/**
 * Validator value maximum length. Will produce an error
 * if value's length is greater than given length
 * @param {number} max
 * @return {function}
 */
export const maxLength = max => value => (value && value.length > max ? tpl('validation.message.maxlength', { max }) : undefined);
/**
 * Validator value minimum length. Will produce an error
 * if value's length is less than given length.
 * @param {number} min
 * @return {function}
 */
export const minLength = min => value => (value && value.length < min ? tpl('validation.message.minlength', { min }) : undefined);
/**
 * Validator for value existence. Will produce an error if value is missing.
 * @return {function}
 */
export const required = () => value => (value ? undefined : t('validation.message.required'));
/**
 * Validation for maximum value
 * @param {number|string} maxValue
 * @return {function}
 */
export const max = maxValue => value => ((value || +value === 0) && +value > maxValue ? tpl('validation.message.max', { max: maxValue }) : undefined);
/**
 * Validation for minimum value
 * @param {number|string} minValue
 * @return {function}
 */
export const min = minValue => value => ((value || +value === 0) && +value < minValue ? tpl('validation.message.min', { min: minValue }) : undefined);
/**
 * Validator for testing against a regex. Will produce an error
 * if value doesn't match the given regex.
 * @param {RegExp} regex
 * @return {function}
 */
export const regex = expression => value => (!value || expression.test(value) ? undefined : t('validation.message.regex'));
