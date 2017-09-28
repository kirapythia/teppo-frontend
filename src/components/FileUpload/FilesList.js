import React from 'react';
import IconButton from '../common/IconButton';
import t from '../../locale';

/**
 * Parse file name from a url
 * @private
 * @param {string} url
 * @return {string} file name
 */
const parseFileName = url => url.substring(url.lastIndexOf('/') + 1);

/**
 * Check if string is a url (starts with http(s))
 * @private
 * @param {string} fileName
 * @return {string}
 */
const isURL = fileName => /^http(s?):\/\//.test(fileName);

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
            ? <a href={fileName} target="_blank">{parseFileName(fileName)}</a>
            : <span>{fileName}</span>
          }
        </div>
        <div><IconButton className="fa-times" onClick={removeFile} /></div>
      </li>
      : <li className="text-italic">{t('files.no_files')}</li>}
  </ul>
);

export default FilesList;
