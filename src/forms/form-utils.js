import React from 'react';
import Select from 'react-select';
import * as R from 'ramda';
import cx from 'classnames';
import FileUpload from '../components/FileUpload';

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
const chooseElement = (props) => {
  const { type, input, placeholder, disabled } = props;
  const hasError = props.touched && props.error;
  const className = cx({ error: hasError });

  // choose element by type. Add cases for radios and checkboxes if needed
  switch (type) {
    case 'textarea':
      return <textarea {...{ ...input, placeholder, className, disabled }} />;
    case 'multiselect':
      return (
        <Select
          {...input}
          multi
          simpleValue
          joinValues
          disabled={disabled}
          onBlur={() => input.onBlur(input.value)}
          options={props.options}
          closeOnSelect={false}
          placeholder={placeholder}
        />
      );
    case 'file':
      return (
        <FileUpload
          {...input}
          disabled={disabled}
          form={props.meta.form}
          placeholder={placeholder}
          multiple={!!props.multiple}
          error={props.meta.error}
          accept={props.accept}
        />
      );
    default:
      return <input {...{ ...input, type, placeholder, className, disabled }} />;
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
export const renderField = (props) => {
  const { input, label, validation, meta: { form, touched, error } } = props;

  return (
    <fieldset>
      <label htmlFor={`${form}_${input.name}`}>{`${label} ${R.prop('required', validation) ? '*' : ''}`}</label>
      { chooseElement(props)}
      {touched && error && <div className="text-danger">{error}</div>}
    </fieldset>
  );
};

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
