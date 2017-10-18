import { reduxForm } from 'redux-form';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { formProjectUrl, zeroPad } from '../../utils';
import { createFieldsWithValidations } from '../../forms/form-utils';
import formFields from '../../forms/plan';
import { getCurrentProject, listPlans } from '../../selectors';
import { NAME, actions } from './PlanForm.ducks';
import { validatePlans } from './model';
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

const formDynamicFieldProps = plan => fieldsWithValidations
  .map(field => ({
    ...field,
    disabled: field.disabled !== undefined
      ? field.disabled
      : Boolean(plan && plan.approved) })
  )
  // show version only when editing
  .filter(field => field.name !== 'version' || plan);

/**
 * Gather all the props needed from the application state
 * @param {object} state
 * @return {object}
 */
const mapStateToProps = (state, ownProps) => {
  const project = getCurrentProject(state) || {};
  const { projectId, mainNo } = project;
  const { plan } = ownProps;
  const allPlans = listPlans(state);
  const fields = formDynamicFieldProps(plan);
  const actionProps = plan
    ? { initialValues: {
      ...plan,
      projectId,
      subNo: zeroPad(plan.subNo, 3),
      files: plan.url
        ? [plan.url]
        : [],
    } }
    : { initialValues: { mainNo, projectId } };

  return {
    fields,
    formSendError: state.planForm.error,
    cancelHref: formProjectUrl(projectId),
    validate: validatePlans(allPlans),
    ...actionProps,
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
