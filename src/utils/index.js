
/**
 * Remove object members by object keys without mutating the object. For example:
 * const obj = { a: 1, b: 2, c: 3 };
 * omit(['a', 'b'], obj) will then return { a: 3 }
 * obj is still { a: 1, b: 2, c: 3 }
 * @param {string[]} keys
 * @param {object} obj
 */
export const omit = (keys, obj) => (keys.length
  ? Object.getOwnPropertyNames(obj)
    .reduce((acc, key) => { if (keys.indexOf(key) === -1) acc[key] = obj[key]; return acc; }, {})
  : obj);

/**
 * Wait given time and successfully resolve the returned promise
 * @param {number} time
 * @param {*[]} rest
 * @return {Promise}
 */
export const wait = (time = 0, ...rest) =>
  new Promise(resolve => setTimeout(() => resolve(...rest), time));

/**
 * Check if given value is null or undefined
 * @param {*} value
 */
export const isNil = value => value === null || value === undefined;
