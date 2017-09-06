import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'redux-little-router';
import { HOME } from '../../constants/routes';
import fields from '../../forms/project';
import { createFieldsWithValidations, renderField } from '../../forms/form-utils';
import t from '../../locale';

const formConfig = {
  form: 'project',
  destroyOnUnmount: true,
};

// form field configuration objects with validator functions from field definitions
const fieldsWithValidations = createFieldsWithValidations(fields);


const submit = () => false;

/**
 * Form for creating a new project
 * @param {Object} props
 * @param {function} props.handleSubmit
 */
const ProjectForm = ({ handleSubmit, valid, pristine, submitting }) => (
  <form className="ProjectForm" onSubmit={handleSubmit(submit)}>
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

export default reduxForm(formConfig)(ProjectForm);
