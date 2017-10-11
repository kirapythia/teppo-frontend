import React from 'react';
import { isURL, parseFileNameFromURL } from '../../utils';
import IconButton from '../common/IconButton';

/**
 * A list item component for a single file
 * @param {object} props
 */
const FilesListItem = ({ file, removeFile }) => {
  const fileName = (file instanceof File ? file.name : file);
  return (
    <li>
      <div><i className="fa fa-file-text fa-fw" /></div>
      <div>
        {isURL(fileName)
          ? <a href={fileName} target="_blank">{parseFileNameFromURL(fileName)}</a>
          : fileName
        }
      </div>
      <div><IconButton className="fa-times" onClick={() => removeFile(file)} /></div>
    </li>
  );
};

export default FilesListItem;
