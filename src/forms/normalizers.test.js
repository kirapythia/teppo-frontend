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
    expect(normalizers.listToString(values)).toEqual(values.join(', '));
  });

  it('should return an zero length string if value is null', () => {
    expect(normalizers.listToString(null)).toEqual('');
  });
});

describe('toNumber', () => {
  it('should format string to number', () => {
    const value = '6';
    expect(normalizers.toNumber(value)).toEqual(Number(value));
  });

  it('should not format empty string to zero', () => {
    const value = 'abc';
    expect(normalizers.toNumber(value)).not.toEqual(NaN);
  });

  it('should format string zero to number zero', () => {
    const value = '0';
    expect(normalizers.toNumber(value)).toEqual(0);
  });

  it('should return value unmodified if it is null', () => {
    expect(normalizers.toNumber(null)).toEqual(null);
  });

  it('should return value unmodified if it is  undefined', () => {
    expect(normalizers.toNumber()).toEqual(undefined);
  });

  it('should return an empty string when value is an empty string', () => {
    expect(normalizers.toNumber('')).toEqual(null);
  });

  it('should return value unmodified if it is NaN', () => {
    expect(normalizers.toNumber(NaN)).toEqual(NaN);
  });
});
