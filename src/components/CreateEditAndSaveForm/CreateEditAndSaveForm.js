import React from 'react';
import { Field } from 'redux-form';
import { renderField } from '../../forms/form-utils';

import Message from '../common/Message';
import FormCancelButton from './FormCancelButton';
import FormSubmitButton from './FormSubmitButton';

/**
 * Generic form for creating a new entity
 * @param {object} props
 * @param {object[]} props.fields Field configurations
 * @param {function} props.handleSubmit Submit function (from redux-form)
 * @param {boolean} props.valid Is form valid?
 * @param {boolean} props.pristine Is form untouched?
 * @param {boolean} props.submitting Is form currently being submitted?
 * @param {string} props.cancelHref Cancel button's link href
 * @param {Error} [props.formSendError] Server error received from server
 * @param {function} saveAction Callback for form submit
 * @param {function} clearSendError Close callback for error message component
 */
const CreateEditAndSaveForm = ({
  fields,
  handleSubmit,
  valid,
  pristine,
  submitting,
  cancelHref,
  formSendError,
  submitAction,
  clearSendError,
}) => (
  <form onSubmit={handleSubmit(submitAction)}>
    { formSendError && <Message message={formSendError.message} onClose={clearSendError} /> }

    { fields.map(field => (
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
        <FormCancelButton href={cancelHref} />
      </div>
      <div className="column column-40 column-offset-20">
        <FormSubmitButton disabled={!valid || pristine || submitting} />
      </div>
    </div>
  </form>
);

export default CreateEditAndSaveForm;
