import React from 'react';
import cx from 'classnames';
import { isURL, parseFileNameFromURL } from '../../utils';
import t from '../../locale'; // common.yes common.no
import './ShowDetails.css';

/**
 * Create a different component for different types of values
 * @private
 * @param {*} value
 * @returns {string|HTMLElement}
 */
const formatValue = (value) => {
  if (isURL(value)) return <a href={value} target="_blank">{parseFileNameFromURL(value)}</a>;
  if (typeof value === 'boolean') {
    return value
      ? <span>{t('common.yes')}</span>
      : <span>{t('common.no')}</span>;
  }
  return value;
};

/**
 * Component for showing project details.
 * @param {object} props
 * @param {string} props.title Title text
 * @param {object[]} props.fields A list of objects {label: string, value: *}
 * @param {string} props.className CSS classname applied to the component
 */
const ShowDetails = ({ title, fields = [], className }) => (
  <div className={cx('ShowDetails', className)}>
    {title && <h2>{title}</h2>}

    {fields.map(({ label, value }) => (
      <div key={label} className="ShowDetails__row">
        <div className="ShowDetails__label">{label}</div>
        <div className="ShowDetails__value">
          <b>{formatValue(value) || '-'}</b>
        </div>
      </div>
    ))}
  </div >
);

export default ShowDetails;
