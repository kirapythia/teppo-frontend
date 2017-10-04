import { createSelector } from 'reselect';
import { listComments } from '../../selectors';

/**
 * Get all comments of the current plan as a list
 * sorted by approved property
 * @param {object} state
 * @return {object[]} comments
 */
export const getSortedComments = createSelector(
  listComments,
  comments => comments.sort((a, b) => Number(!!b.approved) - Number(!!a.approved))
);
