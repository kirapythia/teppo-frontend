import validators from './validators';

describe('type validations', () => {
  describe('string', () => {
    it('should pass if given a valid string', () => {
      expect(validators.type('string')('abc')).toEqual(undefined);
    });

    it('should not pass if given a number', () => {
      expect(validators.type('string')(6)).not.toEqual(undefined);
    });

    it('should pass if given an empty string', () => {
      expect(validators.type('string')('')).toBe(undefined);
    });

    it('should pass if given null', () => {
      expect(validators.type('string')(null)).toEqual(undefined);
    });

    it('should not pass if given NaN', () => {
      expect(validators.type('string')(NaN)).not.toEqual(undefined);
    });

    it('should pass if given undefined', () => {
      expect(validators.type('string')(null)).toEqual(undefined);
    });

    it('should not pass if given an array', () => {
      expect(validators.type('string')([])).not.toEqual(undefined);
    });
  });

  describe('number', () => {
    it('should pass if given a valid number', () => {
      expect(validators.type('number')(6)).toEqual(undefined);
    });

    it('should pass if given a valid negative number', () => {
      expect(validators.type('number')(-6)).toEqual(undefined);
    });

    it('should pass if given a valid decimal number', () => {
      expect(validators.type('number')(-6.2)).toEqual(undefined);
    });

    it('should pass if given null', () => {
      expect(validators.type('number')(null)).toEqual(undefined);
    });

    it('should pass if given undefined', () => {
      expect(validators.type('number')(null)).toEqual(undefined);
    });

    it('should not pass if given NaN', () => {
      expect(validators.type('number')(NaN)).not.toEqual(undefined);
    });

    it('should not pass if given a valid string', () => {
      expect(validators.type('number')('abc')).not.toEqual(undefined);
    });

    it('should not pass if given an array', () => {
      expect(validators.type('number')([1, 2])).not.toEqual(undefined);
    });
  });

  describe('integer', () => {
    it('should pass if given a valid integer', () => {
      expect(validators.type('integer')(6)).toEqual(undefined);
    });

    it('should pass if given a valid negative integer', () => {
      expect(validators.type('integer')(-6)).toEqual(undefined);
    });

    it('should not pass if given a decimal number', () => {
      expect(validators.type('integer')(-6.2)).not.toEqual(undefined);
    });

    it('should not pass if given NaN', () => {
      expect(validators.type('integer')(NaN)).not.toEqual(undefined);
    });

    it('should not pass if given a valid string', () => {
      expect(validators.type('integer')('abc')).not.toEqual(undefined);
    });

    it('should not pass if given null', () => {
      expect(validators.type('integer')(null)).not.toEqual(undefined);
    });

    it('should not pass if given undefined', () => {
      expect(validators.type('integer')(null)).not.toEqual(undefined);
    });
  });

  describe('Array', () => {
    it('should pass validation if value is an array', () => {
      expect(validators.type('array')([])).toEqual(undefined);
    });

    it('should not pass validation if value is not an array', () => {
      expect(validators.type('array')({})).not.toEqual(undefined);
      expect(validators.type('array')(null)).not.toEqual(undefined);
    });
  });
});

describe('minLength', () => {
  it('should pass if given a string with length greater than min', () => {
    expect(validators.minLength(2)('abc')).toEqual(undefined);
  });

  it('should pass if given an array with length same as min', () => {
    expect(validators.minLength(2)(['a', 'c'])).toEqual(undefined);
  });

  it('should pass if given an object with length', () => {
    expect(validators.minLength(2)({ length: 5 })).toEqual(undefined);
  });

  it('should pass if given null', () => {
    expect(validators.minLength(2)(null)).toEqual(undefined);
  });

  it('should pass if given undefined', () => {
    expect(validators.minLength(2)(undefined)).toEqual(undefined);
  });
});

describe('maxLength', () => {
  it('should pass if given an array with length same as max', () => {
    expect(validators.maxLength(2)(['a', 'c'])).toEqual(undefined);
  });

  it('should pass if given a string with length lower than max', () => {
    expect(validators.maxLength(2)('a')).toEqual(undefined);
  });

  it('should pass if given an object with length', () => {
    expect(validators.maxLength(2)({ length: 1 })).toEqual(undefined);
  });

  it('should pass if given null', () => {
    expect(validators.maxLength(2)(null)).toEqual(undefined);
  });

  it('should pass if given undefined', () => {
    expect(validators.maxLength(2)(undefined)).toEqual(undefined);
  });
});

describe('required', () => {
  it('should pass if given a truthy value', () => {
    expect(validators.required()('abc')).toEqual(undefined);
    expect(validators.required()(1)).toEqual(undefined);
    expect(validators.required()(true)).toEqual(undefined);
    expect(validators.required()([])).toEqual(undefined);
    expect(validators.required()({})).toEqual(undefined);
  });

  it('should not pass if given a falsy value', () => {
    expect(validators.required()('')).not.toEqual(undefined);
    expect(validators.required()(0)).not.toEqual(undefined);
    expect(validators.required()(false)).not.toEqual(undefined);
    expect(validators.required()(null)).not.toEqual(undefined);
    expect(validators.required()(undefined)).not.toEqual(undefined);
  });
});
