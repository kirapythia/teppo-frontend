import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { reduxForm } from 'redux-form';

import { HOME } from '../../constants/routes';
import { createFieldsWithValidations } from '../../forms/form-utils';
import { validateHansuProjectId } from './model';
import fields from '../../forms/project';
import { NAME, actions } from './ProjectForm-ducks';
import CreateAndSaveForm from '../Form/CreateAndSaveForm';

/**
 * All fields from fields configuration initialized with an empty string as value
 * @type {object}
 */
const fieldsWithEmptyStringValues = Object.keys(fields)
  .reduce((acc, key) => ({ ...acc, [key]: '' }), {});

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
   * Initial values given to
   */
  initialValues: { ...fieldsWithEmptyStringValues, plans: [] },
  /**
   * Async validator for hansuProjectId
   * @type {function}
   */
  asyncValidate: validateHansuProjectId,
  /**
   * Fields that are validated with asyncValidate
   * @type {string[]}
   */
  asyncBlurFields: ['hansuProjectId'],
};

// form field configuration objects with validator functions from field definitions
const fieldsWithValidations = createFieldsWithValidations(fields);

/**
 * Gather all the props needed from the application state
 * @param {object} state
 * @return {object}
 */
const mapStateToProps = state => ({
  formSendError: state.projectForm.error,
  cancelHref: HOME,
  fields: fieldsWithValidations,
});

/**
 * Gather all the action creators needed
 * @param {function} dispatch the dispatcher function
 * @return {object}
 */
const mapDispatchToProps = dispatch => bindActionCreators({
  saveAction: actions.saveProject,
  clearSendError: actions.clearSendError,
}, dispatch);

/**
 * Form component for creating and saving a project entity
 * Use common form component
 */
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm(formConfig)
)(CreateAndSaveForm);

