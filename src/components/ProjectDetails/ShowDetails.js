import React from 'react';
import cx from 'classnames';
import fields from '../../forms/project';
import './ShowDetails.css';

/**
 * Component for showing project details.
 * @param {object} props
 * @param {object} props.project
 */
const ShowDetails = ({ title, details, className }) => (
  <div className={cx('ShowDetails', className)}>
    {title && <h2>{title}</h2>}

    {Object.keys(details).map(propName => (
      <div key={propName} className="row">
        <div className="three columns">{(fields[propName] || {}).label}</div>
        <div className="nine columns"><b>{details[propName] || '-'}</b></div>
      </div>
    ))}
  </div >
);

export default ShowDetails;
