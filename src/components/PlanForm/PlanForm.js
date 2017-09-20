import { reduxForm } from 'redux-form';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import { createFieldsWithValidations } from '../../forms/form-utils';
import fields from '../../forms/plan';
import { getCurrentProjectId } from '../../selectors';
import { NAME, actions } from './PlanForm-ducks';

import CreateAndSaveForm from '../Form/CreateAndSaveForm';

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

// form field configuration objects with validator functions from field definitions
const fieldsWithValidations = createFieldsWithValidations(fields);

/**
 * Gather all the props needed from the application state
 * @param {object} state
 * @return {object}
 */
const mapStateToProps = (state) => {
  const projectId = getCurrentProjectId(state);
  const { project = {} } = state.projectDetails;

  return {
    project,
    projectId,
    formSendError: state.planForm.error,
    fields: fieldsWithValidations,
    cancelHref: `/project/${projectId}`,
    initialValues: { mainNo: project.mainNo, projectId },
  };
};

/**
 * Gather all the action creators needed
 * @param {function} dispatch the dispatcher function
 * @return {object}
 */
const mapDispatchToProps = dispatch => bindActionCreators({
  saveAction: actions.savePlan,
  clearSendError: actions.clearSendError,
}, dispatch);

/**
 * Form component for creating and saving a plan entity
 * Use common form component
 */
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm(formConfig)
)(CreateAndSaveForm);
