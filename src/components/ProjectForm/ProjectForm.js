import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'redux-little-router';

import { HOME } from '../../constants/routes';
import t from '../../locale';
import { createFieldsWithValidations, renderField } from '../../forms/form-utils';

import fields from '../../forms/project';
import { NAME, actions } from './ProjectForm-ducks';
import Message from '../common/Message';

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
    {fieldsWithValidations.map(field => (
      <Field
        name={field.name}
        key={field.name}
        component={renderField}
        validate={field.validators}
        {...field}
      />
    ))}
    <div className="row">
      <div className="column column-40">
        <Link className="button button-outline full-width" href={HOME}>
          <i className="fa fa-times fa-lg vertical-middle" aria-hidden="true" />&nbsp;
          {t('button.cancel')}
        </Link>
      </div>
      <div className="column column-40 column-offset-20">
        <button
          type="submit"
          className="button full-width"
          disabled={!valid || pristine || submitting}
        >
          <i className="fa fa-floppy-o fa-lg vertical-middle" aria-hidden="true" />&nbsp;
          {t('button.save_project')}
        </button>
      </div>
    </div>
  </form>
);

export default compose(
  reduxForm(formConfig),
  connect(mapStateToProps, mapDispatchToProps)
)(ProjectForm);
