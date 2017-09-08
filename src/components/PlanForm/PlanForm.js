import { reduxForm } from 'redux-form';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import { createFieldsWithValidations } from '../../forms/form-utils';
import fields from '../../forms/plan';
import { getCurrentProjectId } from '../../selectors';
import { NAME, actions } from './PlanForm-ducks';

import CreateAndSaveForm from '../Form/CreateAndSaveForm';

const formConfig = {
  form: NAME,
  destroyOnUnmount: true,
};

// form field configuration objects with validator functions from field definitions
const fieldsWithValidations = createFieldsWithValidations(fields);

const mapStateToProps = state => ({
  projectId: getCurrentProjectId(state),
  formSendError: state.planForm.error,
  fields: fieldsWithValidations,
  cancelHref: `/project/${getCurrentProjectId(state)}`,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  saveAction: actions.savePlan,
  clearSendError: actions.clearSendError,
}, dispatch);

/**
 * Form component for creating and saving a plan entity
 */
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm(formConfig)
)(CreateAndSaveForm);
