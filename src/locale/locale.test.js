import { tpl } from './index';
import lang from './fi.json';

/* eslint-disable no-template-curly-in-string */

it('should replace key with value', () => {
  lang.test_string1 = 'Test${variable}';
  const result = tpl('test_string1', { variable: 'string' });
  expect(result).toEqual('Teststring');
});

it('should replace all keys with values', () => {
  lang.test_string1 = 'Test${name}${ordinal}';
  const result = tpl('test_string1', { name: 'string', ordinal: 1 });
  expect(result).toEqual('Teststring1');
});

it('should return key unmodified if values object is empty', () => {
  lang.test_string1 = 'Test${name}';
  const result = tpl('test_string1', {});
  expect(result).toEqual(lang.test_string1);
});

it('should return key unmodified if values object is undefined', () => {
  lang.test_string1 = 'Test${name}';
  const result = tpl('test_string1');
  expect(result).toEqual(lang.test_string1);
});
