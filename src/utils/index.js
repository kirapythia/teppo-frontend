export const omit = (keys, obj) => (keys.length
  ? Object.getOwnPropertyNames(obj)
    .reduce((acc, key) => { if (keys.indexOf(key) === -1) acc[key] = obj[key]; return acc; }, {})
  : obj);

  /**
   * Wait given time and successfully resolve the returned promise
   * @param {number} time
   * @param {*} args
   * @return {Promise}
   */
export const wait = (time = 0, ...rest) =>
  new Promise(resolve => setTimeout(() => resolve(...rest), time));

/**
 * Check if given value is null or undefined
 * @param {*} value
 */
export const isNil = value => value === null || value === undefined;
