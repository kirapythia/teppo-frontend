import React from 'react';
import { Field } from 'redux-form';
import { renderField } from '../../forms/form-utils';

/**
 * A component for rendering a set of redux form fields
 * @param {object} props
 * @param {object[]} props.fields
 */
const FormFields = ({ fields }) => (
  <div>
    { fields.map(field => (
      <Field
        name={field.name}
        key={field.name}
        component={renderField}
        validate={field.validators}
        {...field}
      />
    ))}
  </div>
);

export default FormFields;
