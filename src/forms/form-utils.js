import React from 'react';
import cx from 'classnames';

import createValidators from '../validation';

const chooseComponent = ({ type, input, placeholder, touched, error }) => {
  const hasError = touched && error;
  const className = cx({ error: hasError });

  switch (type) {
    case 'textarea':
      return <textarea {...{ ...input, placeholder, className }} />;
    default:
      return <input {...{ ...input, type, placeholder, className }} />;
  }
};

export const renderField = ({
  placeholder,
  type,
  input,
  label,
  validation = {},
  meta: { form, touched, error },
}) => (
  <fieldset>
    <label htmlFor={`${form}_${input.name}`}>{`${label} ${validation.required ? '*' : ''}`}</label>
    { chooseComponent({ type, input, placeholder, touched, error })}
    {touched && error && <div className="text-danger">{error}</div>}
  </fieldset>
);

/**
 * Form a map of fields from field definitions. Create validator functions based on validation rules
 * @param {object} fields
 * @returns {object[]}
 */
export const createFieldsWithValidations = fields =>
  Object.keys(fields).map((name) => {
    const fieldProps = fields[name];
    return { ...fieldProps, name, validators: createValidators(fieldProps.validation) };
  });
