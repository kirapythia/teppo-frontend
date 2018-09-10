/**
 * @namespace PlanDetails.Validator
 */

import * as R from 'ramda';
import t, { tpl } from '../../locale';
import { getPlanFileNames, parseFileNameFromURL } from '../../utils';
import { isValidPlanFilename, parsePlanProps } from '../../utils/PlanFilenameParser';

/**
 * Check if a list contains double values
 * @private
 * @param {string[]} list
 * @return {boolean}
 */
const containsDoubles = list => R.uniq(list).length < list.length;
/**
 * Check if two lists contains one or more same values
 * @private
 * @param {string[]} listA
 * @param {string[]} listB
 * @return {boolean}
 */
const listsContainSameValues = (listA, listB) => !!R.intersection(listA, listB).length;

/**
 * Pluck file names from all plan's file url's
 * @private
 * @param {object[]} plans
 * @return {string[]}
 */
const pluckAllFileNamesWithoutVersion = R.pipe(
  R.map(R.props(['pdfUrl', 'xmlUrl', 'dwgUrl'])),
  R.flatten,
  R.filter(Boolean),
  R.map(parseFileNameFromURL),
  R.map(v => v.replace(/_\d{1}(?=\.(pdf|xml|dwg)$)/, ''))
);

/**
 * Return true if a plan file name is not a valid plan file name
 * @private
 * @param {File} file
 * @return {boolean}
 */
const isNonValidPlanFileName = R.pipe(R.prop('name'), isValidPlanFilename, R.not);

/**
 * Assert that form values will not create plans with same projectId, mainNo and subNo combination
 * for they are considered to be new versions of the existing plan
 * @param {object} values Values from the plan form
 * @param {object} project The project to which the plans are being added
 * @return {string|undefined} Returns an error message or undefined if validation passes
 */
export const validatePlans = (allPlans = []) => (values) => {
  const { files = [] } = values;
  const rejectedFiles = R.filter(isNonValidPlanFileName, files);
  // filter all plans belonging to the current project
  const projectsPlans = R.filter(R.propEq('projectId', values.projectId), allPlans);

  if (rejectedFiles.length) {
    return {
      files: tpl('validation.message.rejected_files', {
        filenames: R.pluck('name', rejectedFiles).join(', '),
      }),
    };
  }

  const newPlanFilenames = R.pluck('name', files);
  const mainNumbers = R.map(Number, R.pluck('mainNo', R.map(parsePlanProps, newPlanFilenames)));

  if (!R.all(R.equals(values.mainNo), mainNumbers)) {
    return { files: t('validation.message.main_number_conflict') };
  }

  const existingFilenames = pluckAllFileNamesWithoutVersion(projectsPlans);

  // if project already has a plan with the same identifier combination
  if (listsContainSameValues(existingFilenames, newPlanFilenames)) {
    return { files: t('validation.message.collides_existing_plan_values') };
  }

  // if files list has multiple plans with the same identifier combination
  if (containsDoubles(R.pluck('name', files))) {
    return { files: t('validation.message.double_plan_values') };
  }

  return undefined;
};

/**
 * @private
 * @param {string[]} fileNames
 * @param {object} planProps
 */
const allFilesMatchPlanProps = (fileNames, planProps) => R.pipe(
  R.map(parsePlanProps),
  R.all(props => R.equals(planProps, props)),
)(fileNames);

/**
 * Create validator for plan editing. Check that the file added has
 * the same main and sub numers than the plan object
 * @param {object} plan
 * @return {function}
 */
export const validateSamePlan = (plan = {}) => (values) => {
  const { files = [] } = values;
  const filenames = R.pluck('name', files);
  const rejectedFiles = R.filter(R.pipe(isValidPlanFilename, R.not), filenames);

  if (rejectedFiles.length) {
    return {
      files: tpl('validation.message.rejected_files', {
        filenames: rejectedFiles.join(', '),
      }),
    };
  }

  const existingPlanProps = parsePlanProps(R.head(getPlanFileNames(plan)));

  if (!allFilesMatchPlanProps(filenames, existingPlanProps)) {
    return { files: t('validation.message.plan_identifier_mismatch') };
  }

  if (containsDoubles(filenames)) {
    return { files: t('validation.message.double_plan_values') };
  }

  return undefined;
};

/**
 * Validate files before save
 * @param {object} values A plan object
 * @param {number} values.projectId
 * @param {number} values.mainNo
 * @param {File[]} values.files
 * @return {object|undefined} Errors object, field name as a key
 *                            and error string as value
 */
export const validateOnSave = (values) => {
  const errors = {};

  if (!values.projectId) {
    errors.projectId = t('plan.error.save.no_project_id');
  }

  if (!values.mainNo) {
    errors.mainNo = t('plan.error.save.no_mainNo');
  }

  if (!(values.files || []).length) {
    errors.files = t('plan.error.save.no_files');
  }

  return R.isEmpty(errors) ? undefined : errors;
};
