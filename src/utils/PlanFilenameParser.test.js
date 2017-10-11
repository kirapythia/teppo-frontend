import { parsePlanProps } from './PlanFilenameParser';

describe('Resolving plan mainNo from a file name', () => {
  it('should return undefined if given undefined', () => {
    expect(parsePlanProps().mainNo).toEqual();
  });

  it('should resolve mainNo if it is four digits in the beginning of the file name', () => {
    expect(parsePlanProps('2017_654_plan1.dwg').mainNo).toEqual('2017');
  });

  it('should resolve mainNo if it is five digits in the beginning of the file name', () => {
    expect(parsePlanProps('2017_654_plan1.dwg').mainNo).toEqual('2017');
  });

  it('should resolve mainNo if it is five digits in the beginning of the file name', () => {
    expect(parsePlanProps('2000_654_plan1.dwg').mainNo).toEqual('2000');
  });

  it('should resolve mainNo if it is after the subNo', () => {
    expect(parsePlanProps('654_2000_plan1.dwg').mainNo).toEqual('2000');
    expect(parsePlanProps('1000_2001_plan1.dwg').mainNo).toEqual('2001');
    expect(parsePlanProps('001_2001_plan1.dwg').mainNo).toEqual('2001');
  });

  it('should resolve mainNo if it is somewhere in the filename', () => {
    expect(parsePlanProps('plan_1_654_2000_plan1.dwg').mainNo).toEqual('2000');
    expect(parsePlanProps('1000a2001_plan1.dwg').mainNo).toEqual('2001');
    expect(parsePlanProps('plan2001.dwg').mainNo).toEqual('2001');
  });

  it('should not resolve mainNo if there is less than four digits in the beginning of the file name', () => {
    expect(parsePlanProps('1_plan1.dwg').mainNo).toEqual();
    expect(parsePlanProps('12_plan1.dwg').mainNo).toEqual();
    expect(parsePlanProps('123_plan1.dwg').mainNo).toEqual();
  });

  it('should not resolve mainNo if it less than 2000', () => {
    expect(parsePlanProps('1999_654_plan1.dwg').mainNo).toEqual();
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
    expect(parsePlanProps('2017_654_plan1.dwg').subNo).toEqual('654');
  });

  it('should resolve subNo if it is four digits after the mainNo separated by an underscore', () => {
    expect(parsePlanProps('2017_782_plan1.dwg').subNo).toEqual('782');
  });

  it('should resolve subNo if a hyphen is used as a separator', () => {
    expect(parsePlanProps('2017-782_plan1.dwg').subNo).toEqual('782');
  });

  it('should resolve subNo if a dot is used as a separator', () => {
    expect(parsePlanProps('2017.782.dwg').subNo).toEqual('782');
  });

  it('should resolve subNo if it is before the mainNo', () => {
    expect(parsePlanProps('654_2000_plan1.dwg').subNo).toEqual('654');
    expect(parsePlanProps('1000_2001_plan1.dwg').subNo).toEqual('1000');
    expect(parsePlanProps('001-2001_plan1.dwg').subNo).toEqual('001');
  });

  it('should resolve subNo if file name is just mainNo and subNo separated by a separator character', () => {
    expect(parsePlanProps('2017_782.pdf').subNo).toEqual('782');
  });

  it('should not resolve subNo if it is less than three digits', () => {
    expect(parsePlanProps('2017_7_plan1.dwg').subNo).toEqual();
    expect(parsePlanProps('2017_78_plan1.dwg').subNo).toEqual();
  });

  it('should not resolve subNo if it is more than four digits', () => {
    expect(parsePlanProps('2017_7419223_plan1.dwg').subNo).toEqual();
  });

  it('should not resolve subNo if it is less than 001', () => {
    expect(parsePlanProps('2017_000_plan1.dwg').subNo).toEqual();
  });

  it('should not resolve subNo if it is greater than 1199', () => {
    expect(parsePlanProps('2017_1200_plan1.dwg').subNo).toEqual();
  });
});

it('should not return mainNo property if it is not found', () => {
  const result = parsePlanProps('xxxx_xxx_plan1.dwg');
  expect('mainNo' in result).toBe(false);
});

it('should not return subNo property if it is not found', () => {
  const result = parsePlanProps('xxxx_xxx_plan1.dwg');
  expect('subNo' in result).toBe(false);
});
