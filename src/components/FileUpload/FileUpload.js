import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { without } from 'ramda';
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
 * @param {string} props.form Name of the parent form
 * @param {string} props.name Name of this input
 * @param {string} props.placeholder Text displayed inside the dropzone
 * @param {function} props.onChange Callback for file drop
 * @param {function} props.change Change action creator
 * @param {boolean} props.multiple Should multiple files be allowed to be selected
 * @param {boolean} props.disabled
 * @param {string} props.error
 */
const FileUpload = ({
  form,
  name,
  value,
  placeholder,
  onChange,
  change,
  multiple,
  disabled,
  error,
  accept,
}) => (
  <div className="FileUpload__wrapper">
    <FileList
      files={value}
      disabled={disabled}
      removeFile={(file) => {
        const remaining = without([file], value);
        change(form, name, remaining);
      }}
    />
    {error && <div className="text-danger">{error}</div>}
    {!disabled && (
      <Dropzone
        accept={accept}
        name={name}
        value={value}
        className="FileUpload"
        activeClassName="FileUpload--active"
        onDrop={onChange}
        multiple={multiple}
        disabled={disabled}
      >
        <div className="FileUpload__text-container">{placeholder}</div>
        <div>
          <Button
            className="button-primary u-full-width"
            text={t('button.file_upload')}
          />
        </div>
      </Dropzone>
    )}
  </div>
);

export default connect(() => ({}), mapDispatchToProps)(FileUpload);
