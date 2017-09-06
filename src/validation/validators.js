import t, { tpl } from '../locale';

const isNumber = value => !isNaN(Number(value));
const isString = value => typeof value === 'string';
const isNil = value => value === null || value === undefined;
/**
 * A set of validator function
 * @type {object}
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

