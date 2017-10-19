import { reduxForm } from 'redux-form';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { formProjectUrl, zeroPad } from '../../utils';
import PLAN_STATUS from '../../constants/plan-status';
import { createFieldsWithValidations } from '../../forms/form-utils';
import formFields from '../../forms/plan';
import { getCurrentProject, listPlans } from '../../selectors';
import { NAME, actions } from './PlanForm.ducks';
import { validatePlans, validateSameIdentifiers } from './model';
import CreateEditAndSaveForm from '../CreateEditAndSaveForm';

// form field configuration objects with validator functions from field definitions
const fieldsWithValidations = createFieldsWithValidations(formFields);

/**
 * Redux-form configuration object
 */
const formConfig = {
  /**
   * Form identifier used in form reducer
   * @type {string}
   */
  form: NAME,
  /**
   * Tell redux-form to remove all form related data from
   * the state once the form component is unmounted
   * @type {boolean}
   */
  destroyOnUnmount: true,
  /**
   * Tell redux-form to reinitialize itself when initialValues change
   * @type {boolean}
   */
  enableReinitialize: true,
  /**
   * Tell redux-form to keep it's dirty values when reinitializing
   * @type {boolean}
   */
  keepDirtyOnReinitialize: true,
};

/**
 * Form field props created dynamically from state
 * @param {object} plan
 * @param {object} project
 * @return {object}
 */
const formDynamicFieldProps = (plan = {}, project = {}) => fieldsWithValidations
  .map(field => ({
    ...field,
    disabled: field.disabled !== undefined
      ? field.disabled
      : plan.status === PLAN_STATUS.APPROVED || project.completed,
  }))
  // show version only when editing
  .filter(field => field.name !== 'version' || plan)
  .map(field => (field.name === 'files' ? { ...field, multiple: !plan } : field));

/**
 * Form initial values for plan editing
 * @param {object} plan
 * @param {object} project
 * @return {object}
 */
const formInitialValuesForEditing = (plan, project) => ({
  ...plan,
  projectId: project.projectId,
  subNo: zeroPad(plan.subNo, 3),
  files: plan.url ? [plan.url] : [],
});

/**
 * Gather all the props needed from the application state
 * @param {object} state
 * @return {object}
 */
const mapStateToProps = (state, ownProps) => {
  const project = getCurrentProject(state) || {};
  const { plan } = ownProps;
  const allPlans = listPlans(state);

  return {
    fields: formDynamicFieldProps(plan, project),
    formSendError: state.planForm.error,
    cancelHref: formProjectUrl(project.projectId),
    validate: plan && plan.version > 1
      ? validateSameIdentifiers(plan)
      : validatePlans(allPlans),
    initialValues: plan
      ? formInitialValuesForEditing(plan, project)
      : { mainNo: project.mainNo, projectId: project.projectId },
  };
};

/**
 * Gather all the action creators needed
 * @param {function} dispatch the dispatcher function
 * @param {object} ownProps actual props passed to the component
 * @return {object}
 */
const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  clearSendError: actions.clearSendError,
  submitAction: ownProps.plan
    ? actions.editPlan
    : actions.savePlan,
}, dispatch);

/**
 * Form component for creating and saving a plan entity
 * Use common form component
 */
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm(formConfig)
)(CreateEditAndSaveForm);
