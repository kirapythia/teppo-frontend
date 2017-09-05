import React from 'react';
import cx from 'classnames';

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

export default ({
  validation,
  placeholder,
  type,
  input,
  label,
  meta: { form, touched, error },
}) => (
  <fieldset>
    <label htmlFor={`${form}_${input.name}`}>{`${label} ${validation.required ? '*' : ''}`}</label>
    { chooseComponent({ type, input, placeholder, touched, error })}
    {touched && error && <span>{error}</span>}
  </fieldset>
);
