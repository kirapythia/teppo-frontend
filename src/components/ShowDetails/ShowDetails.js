import React from 'react';
import cx from 'classnames';
import { isURL, parseFileNameFromURL } from '../../utils';
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
      ? <i className="fa fa-check text-success" />
      : <i className="fa fa-times text-danger" />;
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
      <div key={label} className="row">
        <div className="three columns">{label}</div>
        <div className="nine columns">
          <b>{formatValue(value) || '-'}</b>
        </div>
      </div>
    ))}
  </div >
);

export default ShowDetails;
