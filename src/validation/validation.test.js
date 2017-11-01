import createValidators from './index';
import * as validators from './validators';


it('should return an empty array if given no rules', () => {
  expect(createValidators()).toEqual([]);
});

it('should return an empty array if given an empty array', () => {
  expect(createValidators({})).toEqual([]);
});

it('should return corresponding validator for required rule', () => {
  const rules = { required: true };
  const result = createValidators(rules)[0];
  expect(result.toString()).toEqual(validators.required().toString());
});

it('should return corresponding validator for minLength rule', () => {
  const rules = { minLength: 3 };
  const result = createValidators(rules)[0];
  expect(result.toString()).toEqual(validators.minLength(rules.minLength).toString());
});

it('should return corresponding validator for maxLength rule', () => {
  const rules = { maxLength: 3 };
  const result = createValidators(rules)[0];
  expect(result.toString()).toEqual(validators.maxLength(rules.maxLength).toString());
});

it('should return corresponding validator for type rule', () => {
  const rules = { type: 'string' };
  const result = createValidators(rules)[0];
  expect(result.toString()).toEqual(validators.type('string').toString());
});


it('should return validators for all rules', () => {
  const rules = { type: 'number', minLength: 1, maxLength: 2 };
  const result = createValidators(rules);
  expect(result.length).toEqual(Object.keys(rules).length);
});

