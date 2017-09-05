import React from 'react';
import { Field, reduxForm } from 'redux-form';

import fields from '../../forms/project';
import renderField from '../../forms/form-utils';

const formConfig = {
  form: 'project',
  destroyOnUnmount: true,
};

const ProjectForm = ({ handleSubmit }) => (
  <form className="ProjectForm" onSubmit={handleSubmit}>
    {Object.keys(fields).map(name => (
      <Field
        name={name}
        key={name}
        component={renderField}
        {...fields[name]}
      />
    ))}
  </form>
);

export default reduxForm(formConfig)(ProjectForm);
