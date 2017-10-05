import React from 'react';
import { Link } from 'redux-little-router';
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
 * @param {object} props.plan
 * @param {function} props.addComment
 * @param {function} props.handleSubmit
 * @param {function} props.clearError
 * @param {Error} props.formSendError
 * @param {boolean} props.valid
 * @param {pristine} props.pristine
 * @param {submitting} props.submitting
 */
const PlanCommentForm = ({
  plan,
  addComment,
  handleSubmit,
  clearError,
  formSendError,
  valid,
  pristine,
  submitting,
}) => (
  <form className="PlanCommentForm" onSubmit={handleSubmit(addComment)}>
    { formSendError && <Message message={formSendError.message} onClose={clearError} /> }

    <Field
      type="textarea"
      name="text"
      label={t('comment.text')}
      component={renderField}
      validation={{ required: true }}
    />

    <div className="PlanCommentForm__actions row">
      <div className="six columns">
        <Link className="button u-full-width" href={`/project/${plan.projectId}`}>
          <i className="fa fa-angle-left fa-lg" aria-hidden="true" />&nbsp;
          {t('button.back_to_project')}
        </Link>
      </div>
      <div className="six columns">
        <FormSubmitButton
          buttonText={t('button.send')}
          buttonSubmittingText={t('button.sending')}
          iconClassName="fa-envelope-o"
          disabled={!valid || submitting || pristine}
          isSubmitting={submitting}
        />
      </div>
    </div>
  </form>
);

export default reduxForm(formConfig)(PlanCommentForm);
