import * as R from 'ramda';
import { createSelector } from 'reselect';
import { getProjects } from '../../selectors';

/**
 * Get all projects sorted by hansuProjectId (ignore case)
 * @param {object} state
 * @return {object[]}
 */
export const getSortedProjects = createSelector(
  getProjects,
  R.sortBy(R.pipe(R.prop('hansuProjectId'), R.toLower))
);
