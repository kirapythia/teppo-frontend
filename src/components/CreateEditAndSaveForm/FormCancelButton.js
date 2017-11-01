import React from 'react';
import t from '../../locale';
import LinkButton from '../common/LinkButton';

/**
 * Cancel button / link for a form
 * @param {object} props
 * @param {string} props.href Link href
 */
const FormCancelButton = ({ href }) => (
  <LinkButton
    className="u-full-width"
    href={href}
    icon="fa-times"
    text={t('button.cancel')}
  />
);

export default FormCancelButton;
