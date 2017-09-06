import React from 'react';
import { Field, reduxForm } from 'redux-form';

import fields from '../../forms/project';
import renderField from '../../forms/form-utils';
import createValidators from '../../validation';

const formConfig = {
  form: 'project',
  destroyOnUnmount: true,
};

// form a map of fields from field definitions. Create validator functions based on validation rules
const fieldsWithValidations = Object.keys(fields).map((name) => {
  const fieldProps = fields[name];
  return { ...fieldProps, name, validators: createValidators(fieldProps.validation) };
});

/**
 * Form for creating a new project
 * @param {Object} props
 * @param {function} props.handleSubmit
 */
const ProjectForm = ({ handleSubmit }) => (
  <form className="ProjectForm" onSubmit={handleSubmit}>
    {fieldsWithValidations.map(field => (
      <Field
        name={field.name}
        key={field.name}
        component={renderField}
        validate={field.validators}
        {...field}
      />
    ))}
  </form>
);

export default reduxForm(formConfig)(ProjectForm);
