import React from 'react';
import { prop } from 'ramda';
import t from '../../locale';
import FilesListItem from './FilesListItem';

/**
 * List component for displaying a file added with a file upload component
 * @param {object} props
 * @param {File[]} props.files
 * @param {function} props.removeFile
 */
const FilesList = ({ files = [], removeFile }) => (
  <ul className="FilesList clear-list-styles">
    {files.length
      ? files.map(file => (
        <FilesListItem
          key={prop('name', file) || file}
          file={file}
          removeFile={removeFile}
        />
      ))
      : <li className="text-italic">{t('files.no_files')}</li>
    }
  </ul>
);

export default FilesList;
