import t from '../../locale';
import PLAN_STATUS from '../../constants/plan-status';
import { serverDateToString, versionToCharacter, zeroPad } from '../../utils';

/**
 * Format detail values for the ShowDetails component
 * @private
 * @type {function}
 * @param {object} plan
 * @return {object}
 */
export const formPlanDetailFields = plan => ([
  { label: t('plan.primary_id'), value: plan.mainNo },
  { label: t('plan.secondary_id'), value: zeroPad(plan.subNo, 3) },
  { label: t('plan.version'), value: versionToCharacter(plan.version) },
  { label: t('plan.approved'), value: plan.status === PLAN_STATUS.APPROVED },
  { label: t('plan.created'), value: `${serverDateToString(plan.createdAt)} (${plan.createdBy})` },
  { label: t('plan.updated'), value: `${serverDateToString(plan.updatedAt)} (${plan.updatedBy})` },
  { label: t('plan.pdfFile'), value: plan.pdfUrl },
  { label: t('plan.xmlFile'), value: plan.xmlUrl },
]);
