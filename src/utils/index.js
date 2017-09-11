export const omit = (keys, obj) => (keys.length
  ? Object.getOwnPropertyNames(obj)
    .reduce((acc, key) => { if (keys.indexOf(key) === -1) acc[key] = obj[key]; return acc; }, {})
  : obj);

/**
 * Check if given value is null or undefined
 * @param {*} value
 */
export const isNil = value => value === null || value === undefined;
