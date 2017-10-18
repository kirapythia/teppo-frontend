import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { reduxForm } from 'redux-form';
import { HOME } from '../../constants/routes';
import { createFieldsWithValidations } from '../../forms/form-utils';
import { getProjectAsSelectOptions } from '../../selectors';
import { validateHansuProjectId } from './model';
import fields from '../../forms/project';
import { NAME, actions } from './ProjectForm.ducks';
import CreateEditAndSaveForm from '../CreateEditAndSaveForm';
import { formProjectUrl } from '../../utils';

// form field configuration objects with validator functions from field definitions
const fieldsWithValidations = createFieldsWithValidations(fields);

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
  keepDirtyOnReinitialize: false,
};

/**
 * Form field configurations. Form validation functions and then add options
 * to the sisterProjects field
 * @param {object[]} options
 * @param {object} project
 * @return {object[]}
 */
const formFieldConfigs = (options = [], project = {}) => fieldsWithValidations
  .map(f => ({ ...f, disabled: project.completed }))
  .map(f => (f.name === 'sisterProjects' ? { ...f, options } : f));

/**
 * Gather all the props needed from the application state
 * @param {object} state
 * @return {object}
 */
const mapStateToProps = (state, ownProps) => {
  const { project } = ownProps;
  const selectOptions = getProjectAsSelectOptions(state);

  // props that are needed in every case
  const commonProps = {
    formSendError: state.projectForm.error,
    fields: formFieldConfigs(selectOptions, project),
  };

  // props that depend on whether the form is
  // for editing or for creating a new project
  const actionProps = project
    ? {
      initialValues: { ...ownProps.project },
      cancelHref: formProjectUrl(project.projectId),
    }
    : {
      initialValues: { sisterProjects: [] },
      cancelHref: HOME,
      asyncValidate: validateHansuProjectId,
      asyncBlurFields: ['hansuProjectId'],
    };

    // merge common and action dependent props
  return Object.assign(commonProps, actionProps);
};

/**
 * Gather all the action creators needed
 * @param {function} dispatch the dispatcher function
 * @return {object}
 */
const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  submitAction: ownProps.project
    ? actions.editProject
    : actions.saveProject,
  clearSendError: actions.clearSendError,
}, dispatch);

/**
 * Form component for creating and saving a project entity
 * Use common form component
 */
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm(formConfig)
)(CreateEditAndSaveForm);

