import * as validators from './validators';

/**
 * Form validators functions based on given rules set
 *
 * @param {object} rules An object containing validator name as key and
 *    validator value as value. For example:
 *    {
 *      required: true,
 *      minLength: 2
 *    }
 * @return {function[]}
 */
export default (rules = {}) =>
  Object.keys(rules)
    .map((ruleName) => {
      const ruleValue = rules[ruleName];
      return validators[ruleName](ruleValue);
    });
