import React from 'react';
import { Field, reduxForm } from 'redux-form';
import t from '../../locale';
import { renderField } from '../../forms/form-utils';
import { NAME } from './PlanComments.ducks';
import Message from '../common/Message';
import FormSubmitButton from '../CreateEditAndSaveForm/FormSubmitButton';

const formConfig = {
  /**
   * Form identifier used in form reducer
   * @type {string}
   */
  form: NAME,
  /**
   * Tell redux-form to remove all form related data from
   * the state once the form component is unmounted
   * @type {boolean}
   */
  destroyOnUnmount: true,

  initialValues: {
    // FIXME: Remove when actually implemented
    author: 'Seija Suunnittelija',
  },
};

/**
 * A form for plan commenting
 * @param {object} props
 * @param {function} props.addComment
 * @param {function} props.handleSubmit
 * @param {Error} props.formSendError
 * @param {boolean} props.valid
 * @param {pristine} props.pristine
 * @param {submitting} props.submitting
 */
const PlanCommentForm = ({
  addComment,
  handleSubmit,
  formSendError,
  valid,
  pristine,
  submitting,
}) => (
  <form onSubmit={handleSubmit(addComment)}>
    { formSendError && <Message message={formSendError.message} /> }

    <Field
      type="textarea"
      name="body"
      label={t('comment.body')}
      component={renderField}
      validation={{ required: true }}
    />

    <div>
      <FormSubmitButton
        buttonText={t('button.send')}
        buttonSubmittingText={t('button.sending')}
        iconClassName="fa-envelope-o"
        disabled={!valid || submitting || pristine}
        isSubmitting={submitting}
      />
    </div>
  </form>
);

export default reduxForm(formConfig)(PlanCommentForm);
