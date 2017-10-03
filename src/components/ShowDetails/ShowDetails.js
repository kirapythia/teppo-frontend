import React from 'react';
import cx from 'classnames';
import { isURL, parseFileNameFromURL } from '../../utils';
import './ShowDetails.css';

/**
 * Component for showing project details.
 * @param {object} props
 * @param {object} props.project
 */
const ShowDetails = ({ title, details, className, fields }) => (
  <div className={cx('ShowDetails', className)}>
    {title && <h2>{title}</h2>}

    {Object.keys(details).map((propName) => {
      const label = (fields[propName] || {}).label;
      const value = details[propName] || '-';

      return (
        <div key={propName} className="row">
          <div className="three columns">{label}</div>
          <div className="nine columns">
            <b>{isURL(value)
              ? <a href={value} target="_blank">{parseFileNameFromURL(value)}</a>
              : value}
            </b>
          </div>
        </div>
      );
    })}
  </div >
);

export default ShowDetails;
