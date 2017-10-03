import React from 'react';
import IconButton from '../common/IconButton';
import t from '../../locale';
import { isURL, parseFileNameFromURL } from '../../utils';

/**
 * List component for displaying a file added with a file upload component
 * @param {object} props
 * @param {File[]} props.files
 * @param {function} props.removeFile
 */
const FilesList = ({ fileName, removeFile }) => (
  <ul className="FilesList clear-list-styles">
    {fileName
      ? <li key={fileName}>
        <div><i className="fa fa-file-text fa-fw" /></div>
        <div>
          {isURL(fileName)
            ? <a href={fileName} target="_blank">{parseFileNameFromURL(fileName)}</a>
            : <span>{fileName}</span>
          }
        </div>
        <div><IconButton className="fa-times" onClick={removeFile} /></div>
      </li>
      : <li className="text-italic">{t('files.no_files')}</li>}
  </ul>
);

export default FilesList;
