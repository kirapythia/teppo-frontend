import React from 'react';
import { isURL, parseFileNameFromURL } from '../../utils';
import IconButton from '../common/IconButton';

/**
 * A list item component for a single file
 * @param {object} props
 * @param {File|string} props.file File object or a url string
 * @param {boolean} props.disabled If true then the remove button is hidden
 * @param {function} props.removeFile Callback for the remove button
 */
const FilesListItem = ({ file = {}, removeFile, disabled }) => {
  const fileName = file.name;
  return (
    <li>
      <div><i className="fa fa-file-text fa-fw" /></div>
      <div>
        {isURL(fileName)
          ? <a href={fileName} target="_blank">{parseFileNameFromURL(fileName)}</a>
          : fileName
        }
      </div>
      <div>{!disabled && <IconButton className="fa-times" onClick={() => removeFile(file)} />}</div>
    </li>
  );
};

export default FilesListItem;
