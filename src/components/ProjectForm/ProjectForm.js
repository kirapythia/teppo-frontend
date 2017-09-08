import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { reduxForm } from 'redux-form';

import { HOME } from '../../constants/routes';
import { createFieldsWithValidations } from '../../forms/form-utils';

import fields from '../../forms/project';
import { NAME, actions } from './ProjectForm-ducks';
import CreateAndSaveForm from '../Form/CreateAndSaveForm';

const formConfig = {
  form: NAME,
  destroyOnUnmount: true,
};

// form field configuration objects with validator functions from field definitions
const fieldsWithValidations = createFieldsWithValidations(fields);

const mapStateToProps = state => ({
  formSendError: state.projectForm.error,
  cancelHref: HOME,
  fields: fieldsWithValidations,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  saveAction: actions.saveProject,
  clearError: actions.clearSendError,
}, dispatch);

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm(formConfig)
)(CreateAndSaveForm);

