import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { reduxForm } from 'redux-form';

import { HOME } from '../../constants/routes';
import { createFieldsWithValidations } from '../../forms/form-utils';

import fields from '../../forms/project';
import { NAME, actions } from './ProjectForm-ducks';

import Message from '../common/Message';
import FormFields from '../Form/FormFields';
import FormCancelButton from '../Form/FormCancelButton';
import FormSubmitButton from '../Form/FormSubmitButton';

const formConfig = {
  form: NAME,
  destroyOnUnmount: true,
};

// form field configuration objects with validator functions from field definitions
const fieldsWithValidations = createFieldsWithValidations(fields);

const mapStateToProps = state => ({
  formSendError: state.projectForm.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createProject: actions.createProject,
  clearError: actions.clearSendError,
}, dispatch);

/**
 * Form for creating a new project
 * @param {Object} props
 * @param {function} props.handleSubmit
 */
const ProjectForm = ({
  handleSubmit,
  valid,
  pristine,
  submitting,
  createProject,
  formSendError,
  clearError,
}) => (
  <form className="ProjectForm" onSubmit={handleSubmit(createProject)}>
    { formSendError && <Message message={formSendError.message} onClose={clearError} /> }

    <FormFields fields={fieldsWithValidations} />

    <div className="row">
      <div className="column column-40">
        <FormCancelButton href={HOME} />
      </div>
      <div className="column column-40 column-offset-20">
        <FormSubmitButton disabled={!valid || pristine || submitting} />
      </div>
    </div>
  </form>
);

export default compose(
  reduxForm(formConfig),
  connect(mapStateToProps, mapDispatchToProps)
)(ProjectForm);