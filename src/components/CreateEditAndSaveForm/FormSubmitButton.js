import React from 'react';
import t from '../../locale';

const chooseContent = isSubmitting => (isSubmitting
  ? <span><i className="fa fa-spinner fa-spin fa-lg" aria-hidden="true" />&nbsp;{`${t('button.saving')}...`}</span>
  : <span><i className="fa fa-floppy-o fa-lg" aria-hidden="true" />&nbsp;{t('button.save')}</span>);

/**
 * Submit button for a form
 * @param {object} props
 * @param {boolean} props.disabled
 */
const FormSubmitButton = ({ isSubmitting, disabled }) => (
  <button type="submit" className="button button-primary u-full-width" disabled={disabled}>
    {chooseContent(isSubmitting)}
  </button>
);

export default FormSubmitButton;
