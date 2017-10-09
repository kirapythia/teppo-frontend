import t from '../../locale';
import { serverDateToString, versionToCharacter } from '../../utils';

/**
 * Format detail values for the ShowDetails component
 * @private
 * @type {function}
 * @param {object} plan
 * @return {object}
 */
export const formPlanDetailFields = plan => ([
  { label: t('plan.primary_id'), value: plan.mainNo },
  { label: t('plan.secondary_id'), value: plan.subNo },
  { label: t('plan.version'), value: versionToCharacter(plan.version) },
  { label: t('plan.approved'), value: plan.approved },
  { label: t('plan.created'), value: `${serverDateToString(plan.createdAt)} (${plan.createdBy})` },
  { label: t('plan.updated'), value: `${serverDateToString(plan.updatedAt)} (${plan.updatedBy})` },
  { label: t('plan.file'), value: plan.url },
]);
