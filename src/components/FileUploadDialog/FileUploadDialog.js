import React from 'react';
import * as R from 'ramda';
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import t from '../../locale';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { actions } from './FileUploadDialog.ducks';
import './FileUploadDialog.css';

const getFilesize = R.prop('size');
const sumSize = R.reduce((acc, file) => R.add(acc, getFilesize(file)), 0);
const calculatePercentageDone = (done, total) => R.defaultTo(0, Math.floor((done / total) * 100));

const mapStateToProps = (state, ownProps) => {
  const batchData = state.fileUpload[ownProps.reducerKey] || {};
  const {
    succeeded = [],
    failed = [],
    files = [],
    currentFile = {},
    isBatchDone = false,
  } = batchData;

  const uploadedFilesize = sumSize(R.concat(succeeded, failed));
  const totalFileSize = sumSize(files);

  return {
    isBatchDone,
    currentFile: currentFile.name,
    isBatchActive: !R.isEmpty(batchData),
    totalRequests: files.length,
    currentRequest: files.indexOf(currentFile) + 1,
    percentageDone: calculatePercentageDone(uploadedFilesize, totalFileSize),
    hasSucceeds: !!succeeded.length,
    hasFailures: !!failed.length,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  clearBatch: actions.clearBatch,
}, dispatch);

/**
 * FileUpload indicator
 * @private
 * @param {object} props
 * @see {FileUploadDialog}
 */
const FileUploadIndicator = ({ isBatchDone, hasFailures, hasSucceeds, percentageDone }) => (
  <div className="FileUploadDialog__indicator-track">
    <div
      className={cx('FileUploadDialog__indicator', isBatchDone ? {
        'FileUploadDialog__indicator--success': !hasFailures && hasSucceeds,
        'FileUploadDialog__indicator--error': hasFailures && !hasSucceeds,
        'FileUploadDialog__indicator--warning': hasFailures && hasSucceeds,
      } : {})}
      style={{ width: `${percentageDone}%` }}
    >
      <span className="FileUploadDialog__indicator-filesize">{percentageDone}%</span>
    </div>
  </div>
);

/**
 * Dialog component for visualising file upload
 * @param {object} props
 * @param {string} props.title Dialog title
 * @param {string} props.reducerKey Identifier Key that connects this dialog instance
 *                 to the correct batch data in the reducer
 * @param {File} props.currentFile Name of the file currently being uploaded
 * @param {number} props.currentRequest Current request's ordeal number
 * @param {number} props.totalRequest The number of requests in this batch
 * @param {number} props.percentageDone The percent of files (measured by size)
 *                 that has been processed
 * @param {function} props.clearBatch Action for discarding all batch data
 * @param {boolean} props.isBatchActive Is batch still active, meaning that does the reducer
 *                 still have batch data for this dialog (clear batch has not been run)
 * @param {boolean} props.hasFailures Has a file upload been failed
 * @param {boolean} props.hasSucceeds Has a file upload been succeeded
 * @param {boolean} props.isBatchDone Is batch done (all file uploads done)
 */
const FileUploadDialog = ({
  title,
  reducerKey,
  currentFile,
  currentRequest,
  totalRequests,
  percentageDone,
  clearBatch,
  isBatchActive,
  hasFailures,
  hasSucceeds,
  isBatchDone,
}) => (
  <Modal isVisible={isBatchActive}>
    <div className="FileUploadDialog">
      <h4>{title}</h4>
      <div>{t('plan.fileupload_dialog.uploading_file')}: {currentFile} ({currentRequest}/{totalRequests})</div>
      <div className="FileUploadDialog__indicator-wrapper">
        <div className="FileUploadDialog__indicator-header"></div>
      </div>
      {false && (
        <div className="FileUploadDialog__indicator-wrapper">
          <div className="FileUploadDialog__indicator-header">
            <div className="text-left">0%</div>
            <div className="text-right">100%</div>
          </div>
          <FileUploadIndicator {...{ isBatchDone, hasFailures, hasSucceeds, percentageDone }} />
        </div>
      )}
      <div className="text-right">
        <Button
          icon="fa-times"
          text={t('button.close')}
          disabled={!isBatchDone}
          onClick={() => clearBatch(reducerKey)}
        />
      </div>
    </div>
  </Modal>
);

export default connect(mapStateToProps, mapDispatchToProps)(FileUploadDialog);
