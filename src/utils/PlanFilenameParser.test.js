import { parsePlanProps } from './PlanFilenameParser';

describe('Resolving plan mainNo from a file name', () => {
  it('should return undefined if given undefined', () => {
    expect(parsePlanProps().mainNo).toEqual();
  });

  it('should resolve mainNo if it is four digits in the beginning of the file name', () => {
    expect(parsePlanProps('2017_654.pdf').mainNo).toEqual('2017');
  });

  it('should resolve mainNo if it is five digits in the beginning of the file name', () => {
    expect(parsePlanProps('20172_654.pdf').mainNo).toEqual('20172');
  });

  it('should not resolve mainNo if there is less than four digits in the beginning of the file name', () => {
    expect(parsePlanProps('1_624.pdf').mainNo).toEqual();
    expect(parsePlanProps('12_112.pdf').mainNo).toEqual();
    expect(parsePlanProps('123_001.pdf').mainNo).toEqual();
  });

  it('should not resolve mainNo if it less than 2000', () => {
    expect(parsePlanProps('1999_654.pdf').mainNo).toEqual();
  });

  it('should return undefined if mainNo can not be parsed', () => {
    expect(parsePlanProps('a').mainNo).toEqual();
  });
});

describe('Resolving plan subNo from a file name', () => {
  it('should return undefined if given undefined', () => {
    expect(parsePlanProps().subNo).toEqual();
  });

  it('should resolve subNo if it is three digits after the mainNo separated by an underscore', () => {
    expect(parsePlanProps('2017_654.pdf').subNo).toEqual('654');
  });

  it('should resolve subNo if it is four digits after the mainNo separated by an underscore', () => {
    expect(parsePlanProps('2017_782.pdf').subNo).toEqual('782');
  });

  it('should not resolve subNo if a dot is used as a separator', () => {
    expect(parsePlanProps('2017.782.pdf').subNo).toEqual();
  });

  it('should resolve subNo if file name is just mainNo and subNo separated by a separator character', () => {
    expect(parsePlanProps('2017_782.pdf').subNo).toEqual('782');
  });

  it('should not resolve subNo if it is less than three digits', () => {
    expect(parsePlanProps('2017_7.pdf').subNo).toEqual();
    expect(parsePlanProps('2017_78.pdf').subNo).toEqual();
  });

  it('should not resolve subNo if it is more than four digits', () => {
    expect(parsePlanProps('2017_7419223.pdf').subNo).toEqual();
  });

  it('should not resolve subNo if it is less than 001', () => {
    expect(parsePlanProps('2017_000.pdf').subNo).toEqual();
  });

  it('should not resolve subNo if it is greater than 1199', () => {
    expect(parsePlanProps('2017_1200.pdf').subNo).toEqual();
  });
});

describe('Resolving plan version from a file name', () => {
  it('should resolve file version if it is a single letter after sub number', () => {
    expect(parsePlanProps('2017_123A.pdf').version).toEqual('A');
  });

  it('should resolve file version if it is a two letters after sub number', () => {
    expect(parsePlanProps('2017_123XX.pdf').version).toEqual('XX');
  });

  it('should resolve file version if it is lowercased', () => {
    expect(parsePlanProps('2017_123xx.pdf').version).toEqual('xx');
  });

  it('should resolve file version if it is longer than two letters', () => {
    expect(parsePlanProps('2017_123xxx.pdf').version).toEqual();
  });
});

it('should not return mainNo property if it is not found', () => {
  const result = parsePlanProps('xxxx_xxx.pdf');
  expect('mainNo' in result).toBe(false);
});

it('should not return subNo property if it is not found', () => {
  const result = parsePlanProps('xxxx_xxx.pdf');
  expect('subNo' in result).toBe(false);
});
