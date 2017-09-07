export const stringToList = value => (value ? value.replace(/,\s/g, ',').split(/,\s?/) : []);
export const listToString = value => (value ? value.join(', ') : '');
export const toNumber = value => Number(value);
