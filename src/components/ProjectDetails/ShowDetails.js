import React from 'react';
import fields from '../../forms/project';
// import { omit } from '../../utils';

/**
 * Component show project details.
 */
const ShowDetails = ({ project }) => (
  <div >
    <h2>{project.title}</h2>
    {Object.keys(project.details).map(propName => (
      <div key={propName} className="row">
        <div className="column column-30">
          {(fields[propName] || {}).label}
        </div>
        <div className="column">
          <b>{project.details[propName]}</b>
        </div>
      </div>
    ))}

  </div >
);

export default ShowDetails;
