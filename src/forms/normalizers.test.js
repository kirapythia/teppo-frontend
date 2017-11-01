import * as normalizers from './normalizers';

describe('stringToList', () => {
  it('should return an array', () => {
    expect(normalizers.stringToList('')).toEqual([]);
  });

  it('should return an array containing value', () => {
    const value = 'a';
    expect(normalizers.stringToList(value)).toEqual([value]);
  });

  it('should return an array containing all comma separated values', () => {
    const value = 'a,b,c';
    expect(normalizers.stringToList(value)).toEqual(value.split(','));
  });

  it('should return an array containing all comma plus space separated values', () => {
    const value = 'a, b, c';
    expect(normalizers.stringToList(value)).toEqual(value.split(', '));
  });

  it('should return an empty array if value is null', () => {
    expect(normalizers.stringToList(null)).toEqual([]);
  });
});

describe('listToString', () => {
  it('should return an empty string when list contains no values', () => {
    expect(normalizers.listToString([])).toEqual('');
  });

  it('should return value from list', () => {
    const value = 'a';
    expect(normalizers.listToString([value])).toEqual(value);
  });

  it('should return comma-space concatenated values', () => {
    const values = ['a', 'b', 'c'];
    expect(normalizers.listToString(values)).toEqual(values.join(','));
  });

  it('should return an zero length string if value is null', () => {
    expect(normalizers.listToString(null)).toEqual('');
  });
});
