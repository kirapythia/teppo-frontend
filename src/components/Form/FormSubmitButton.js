import React from 'react';
import t from '../../locale';

/**
 * Submit button for a form
 * @param {object} props
 * @param {boolean} props.disabled
 */
const FormSubmitButton = ({ disabled }) => (
  <button type="submit" className="button full-width" disabled={disabled}>
    <i className="fa fa-floppy-o fa-lg vertical-middle" aria-hidden="true" />&nbsp;
    {t('button.save')}
  </button>
);

export default FormSubmitButton;
