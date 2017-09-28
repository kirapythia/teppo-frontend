import React from 'react';
import t from '../../locale';

/**
 * Submit button for a form
 * @param {object} props
 * @param {boolean} props.disabled
 */
const FormSubmitButton = ({ disabled }) => (
  <button type="submit" className="button button-primary u-full-width" disabled={disabled}>
    <i className="fa fa-floppy-o fa-lg" aria-hidden="true" />&nbsp;
    {t('button.save')}
  </button>
);

export default FormSubmitButton;
