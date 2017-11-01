import * as R from 'ramda';
import { createSelector } from 'reselect';
import { getCurrentPlanId, getSecondLatestVersionOfPlan } from '../../selectors';
import { mapToList } from '../../utils';

const getComments = state => state.comments.comments;

/**
 * Get all comments as a list
 * @param {object} state
 * @return {object[]} a list of comments
 */
export const listComments = createSelector(
  getComments,
  mapToList,
);

/**
 * Get all comments from current plan
 * @param {object} state
 * @return {object[]} A list of comment objects
 */
export const getCommentsForCurrentPlan = createSelector(
  listComments,
  getCurrentPlanId,
  (comments, planId) => comments.filter(R.propEq('planId', +planId))
);

/**
 * Convert value to a date time number
 * @private
 * @param {string} dateString
 * @return {number}
 */
const toDatetime = dateString => new Date(dateString).getTime();

/**
 * Get all comments of the current plan as a list
 * sorted by approved property
 * @param {object} state
 * @return {object[]} comments
 */
export const getSortedComments = createSelector(
  getCommentsForCurrentPlan,
  R.sortWith([
    R.descend(R.prop('approved')),
    R.descend(R.pipe(R.prop('createdAt'), toDatetime)),
  ]),
);

export const getApprovedCommentsFromPreviousVersion = createSelector(
  getSecondLatestVersionOfPlan,
  listComments,
  (plan = {}, comments) => R.pipe(
    R.filter(R.both(R.propEq('planId', plan.planId), R.propEq('approved', true))),
    R.sortBy(R.prop('createdAt')),
    R.reverse,
  )(comments),
);
