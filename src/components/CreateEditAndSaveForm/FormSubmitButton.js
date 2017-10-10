import React from 'react';
import t from '../../locale';
import Button from '../common/Button';

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
  <Button
    type="submit"
    className="button-primary u-full-width"
    text={isSubmitting ? `${buttonSubmittingText}...` : buttonText}
    icon={isSubmitting ? 'fa-spinner fa-spin fa-lg' : `fa-lg ${iconClassName}`}
    disabled={disabled}
  />
);

export default FormSubmitButton;
