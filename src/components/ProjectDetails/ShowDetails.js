import React from 'react';
import fields from '../../forms/project';
import { omit } from '../../utils';

/**
 * Component to show project details.
 */
const ShowDetails = ({ project }) => {
  const values = omit(['id', 'name', 'alternativeNames'], project);
  return (
    <div>
      <h2>{project.name}</h2>
      {Object.keys(values).map(propName => (
        <div key={propName} className="row">
          <div className="column">
            {(fields[propName] || {}).label}
          </div>
          <div className="column">
            {project[propName]}
          </div>
        </div>
      ))}

      <div className="row">
        <div className="column">
          {fields.alternativeNames.label}
        </div>
        <div className="column">
          {(project.alternativeNames || []).join(', ')}
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
