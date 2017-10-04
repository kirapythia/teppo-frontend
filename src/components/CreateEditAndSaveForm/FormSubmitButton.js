import React from 'react';
import t from '../../locale';

const chooseContent = ({
  isSubmitting,
  buttonText,
  buttonSubmittingText,
  iconClassName,
}) => (isSubmitting
  ? <span><i className="fa fa-spinner fa-spin fa-lg" aria-hidden="true" />&nbsp;{`${buttonSubmittingText}...`}</span>
  : <span><i className={`fa fa-lg ${iconClassName}`} aria-hidden="true" />&nbsp;{buttonText}</span>);

/**
 * Submit button for a form
 * @param {object} props
 * @param {boolean} props.disabled
 * @param {boolean} props.isSubmitting
 * @param {string} [props.buttonText] Text shown when isSubmitting is false
 * @param {string} [props.buttonSubmittingText] Text shown when isSubmitting is true
 * @param {string} [props.iconClassName] Class name for choosing an icon
 */
const FormSubmitButton = ({
  isSubmitting,
  disabled,
  buttonText = t('button.save'),
  buttonSubmittingText = t('button.saving'),
  iconClassName = 'fa-floppy-o',
}) => (
  <button type="submit" className="button button-primary u-full-width" disabled={disabled}>
    {chooseContent({ isSubmitting, buttonText, buttonSubmittingText, iconClassName })}
  </button>
);

export default FormSubmitButton;
