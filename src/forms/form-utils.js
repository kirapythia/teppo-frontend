import React from 'react';
import cx from 'classnames';
import Dropzone from 'react-dropzone';

import createValidators from '../validation';

/**
 * Choose a correct html input element
 * @param {object} props
 * @param {string} props.type
 * @param {object} props.input
 * @param {string} props.placeholder
 * @param {boolean} touched
 * @param {boolean} error
 * @return {HTMLElement}
 */
const chooseElement = ({ type, input, placeholder, touched, error }) => {
  const hasError = touched && error;
  const className = cx({ error: hasError });

  // choose element by type. Add cases for radios and checkboxes if needed
  switch (type) {
    case 'textarea':
      return <textarea {...{ ...input, placeholder, className }} />;
    case 'file':
      return (
        <Dropzone
          {...input}
          onDrop={input.onChange}
        >
          <span>{placeholder}</span>
        </Dropzone>
      );
    default:
      return <input {...{ ...input, type, placeholder, className }} />;
  }
};

/**
 * Render a label and input combo for each form input. Will be passed to
 * redux-form Field component as component property
 * @param {object} props
 * @param {string} props.placeholder
 * @param {string} props.type input type
 * @param {object} props.input input props
 * @param {string} props.label label text
 * @param {object} props.validation input validation rules
 * @param {object} props.meta input meta data (validation state etc)
 * @return {React.Component}
 */
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
    { chooseElement({ type, input, placeholder, touched, error })}
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
