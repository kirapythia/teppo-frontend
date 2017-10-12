import { zeroPad } from '../../utils';

/**
 * Form plan identifier from main and sub number
 * @param {object} plan
 * @return {string}
 */
export const formIdentifier = plan => `${plan.mainNo}/${zeroPad(plan.subNo, 3)}`;

/**
 * Sort plans by identifier (main/subnumber) descending
 * @param {object[]} plans
 * @return {object[]} sorted plans
 */
export const sortPlans = (plans = []) =>
  plans.sort((a, b) => (formIdentifier(a) >= formIdentifier(b) ? 1 : -1));
