import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { change as changeFormAction } from 'redux-form';
import t from '../../locale';
import Button from '../common/Button';
import FileList from './FilesList';

import './FileUpload.css';

const mapDispatchToProps = dispatch => bindActionCreators({
  change: changeFormAction,
}, dispatch);

/**
 * Input component for file upload via drag and drop or file selection dialog
 * @param {object} props
 * @param {string} props.name
 * @param {string} props.placeholder
 * @param {function} props.onChange
 */
const FileUpload = ({ form, name, value, placeholder, onChange, change }) => (
  <div className="FileUpload__wrapper">
    <FileList
      fileName={value instanceof File ? value.name : value}
      removeFile={() => change(form, name, null)}
    />
    <Dropzone
      name={name}
      value={value}
      className="FileUpload"
      multiple={false}
      activeClassName="FileUpload--active"
      onDrop={files => onChange(files[0])}
    >
      <div className="FileUpload__text-container">{placeholder}</div>
      <div>
        <Button
          className="button-primary u-full-width"
          text={t('button.file_upload')}
        />
      </div>
    </Dropzone>
  </div>
);

export default connect(() => ({}), mapDispatchToProps)(FileUpload);
