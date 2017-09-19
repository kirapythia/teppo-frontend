import t, { tpl } from '../locale';
import { isNil } from '../utils';

const isNumber = value => !isNaN(Number(value));
const isString = value => typeof value === 'string';

/**
 * A set of validator function creators. Each validator takes rule value as first argument
 * and then returns an curried function whitch takes the actual value as a parameter. Validator
 * function will return an error string if validation fails and undefined if validation passes.
 * @namespace
 * @property {function} type Will produce an error if value's type is wrong
 * @property {function} maxLength Will produce an error if value's length is greater
 *                                than given length
 * @property {function} minLength Will produce an error if value's length is less
 *                                than given length
 * @property {function} required Will produce an error if value is missing
 *
 */
const validators = {
  /**
   * Validator for value type
   * @param {string|number|integer} type
   */
  type: requiredType => (value) => {
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
        return !value || /^[a-zA-Z0-9]*$/.test(value) ? undefined : t('validation.message.type.alphanum');
      default:
        return true;
    }
  },
  /**
   * Validator value maximum length
   * @param {number} max
   */
  maxLength: max => value => (value && value.length > max ? tpl('validation.message.maxlength', { max }) : undefined),
  /**
   * Validator value minimum length
   * @param {number} min
   */
  minLength: min => value => (value && value.length < min ? tpl('validation.message.minlength', { min }) : undefined),
  /**
   * Validator for value existence
   */
  required: () => value => (value ? undefined : t('validation.message.required')),
};

export default validators;

