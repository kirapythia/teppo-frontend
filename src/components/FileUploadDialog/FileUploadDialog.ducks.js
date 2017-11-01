import * as R from 'ramda';
import { createAction, handleActions } from 'redux-actions';
import { Cmd, loop } from 'redux-loop';
import { uploadFile } from '../../utils/ajax';

export const NAME = 'fileUpload';

export const actionTypes = {
  FILE_UPLOAD_BATCH_START: 'pythia-webclient/FileUploadDialog/FILE_UPLOAD_BATCH_START',
  UPLOAD_FILE: 'pythia-webclient/FileUploadDialog/UPLOAD_FILE',
  UPLOAD_FILE_SUCCESS: 'pythia-webclient/FileUploadDialog/UPLOAD_FILE_SUCCESS',
  UPLOAD_FILE_ERROR: 'pythia-webclient/FileUploadDialog/UPLOAD_FILE_ERROR',
  FILE_UPLOAD_BATCH_END: 'pythia-webclient/FileUploadDialog/FILE_UPLOAD_BATCH_END',
  CLEAR_BATCH: 'pythia-webclient/FileUploadDialog/CLEAR_BATCH',
};

/**
 * Create meta data for an action
 * @private
 * @param {string} key reducer key for seprating different batches
 * @return {object}
 */
const metaCreator = key => ({ key });

export const actions = {
  /**
   * Start a group of file uploads
   * @param {string} key
   * @param {File[]} files
   * @param {string} url
   * @return {object}
   */
  startBatch: createAction(
    actionTypes.FILE_UPLOAD_BATCH_START,
    (key, files) => ({ files }),
    (key, files, url) => ({ key, url }),
  ),

  /**
   * Start uploading a file
   * @param {string} key
   * @param {File} file
   * @return {object}
   */
  uploadFile: createAction(
    actionTypes.UPLOAD_FILE,
    (key, file) => ({ file }),
    (key, file, url) => ({ key, url }),
  ),

  /**
   * Success action for a file upload
   * @param {string} key
   * @param {File} file
   * @return {object}
   */
  fileUploadSuccess: createAction(
    actionTypes.UPLOAD_FILE_SUCCESS,
    (key, file, response) => ({ file, response }),
    metaCreator
  ),

  /**
   * Fail action for a file upload
   * @param {string} key
   * @param {File} file
   * @return {object}
   */
  fileUploadFail: createAction(
    actionTypes.UPLOAD_FILE_ERROR,
    (key, file) => ({ file }),
    metaCreator
  ),

  /**
   * End batch. Run when each upload is either succeeded or failed
   * @param {string} key
   * @param {object} batchData All data related to this batch
   * @return {object}
   */
  endBatch: createAction(
    actionTypes.FILE_UPLOAD_BATCH_END,
    (key, batchData) => batchData,
    metaCreator
  ),

  /**
   * Clear batch data from state
   * @param {string} key
   * @return {object}
   */
  clearBatch: createAction(
    actionTypes.CLEAR_BATCH,
    () => {},
    metaCreator
  ),
};

/**
 * Factory function for creating a handler for file upload success and fail actions. Handler
 * will update succeede/failed files status and dispatch the end batch action if each file upload
 * is either succeeded or failed
 * @param {string} propName
 * @return {function}
 */
const handleFileUploadOrSuccess = propName =>
  /**
   * @param {object} state
   * @param {object} action
   * @return {object}
   */
  (state, action) => {
    const { key } = action.meta;
    const { file, response } = action.payload;
    const propLens = R.lensPath([key, propName]);
    const responseLens = R.lensPath([key, 'responses']);
    const newState = R.pipe(
      R.over(propLens, R.append(file)),
      R.over(responseLens, response ? R.append(response) : R.identity),
    )(state);
    const batchData = newState[key];
    // all done?
    return (batchData.succeeded.length + batchData.failed.length === batchData.files.length)
      ? loop(newState, Cmd.action(actions.endBatch(key, batchData)))
      : newState;
  };

const initBatchData = action => ({
  ...action.payload,
  succeeded: [],
  failed: [],
  responses: [],
  isBatchDone: false,
});

/**
 * FileUploadDialog reducer
 * @type {function}
 * @param {object} state
 * @param {object} action
 * @return {object} state
 */
export default handleActions({
  // initialize and start a sequnce of file uploads
  [actionTypes.FILE_UPLOAD_BATCH_START]: (state, action) => {
    const { key, url } = action.meta;
    const { files } = action.payload;
    const fileToAction = file => Cmd.action(actions.uploadFile(key, file, url));

    return loop(
      R.assoc(key, initBatchData(action), state),
      // form a list of upload actions from files and run them in sequence
      Cmd.list(files.map(fileToAction), { sequence: true }),
    );
  },

  // upload a single file to the server
  [actionTypes.UPLOAD_FILE]: (state, action) => {
    const { key, url } = action.meta;
    const { file } = action.payload;

    return loop(
      // add current file to batch data
      R.assocPath([key, 'currentFile'], file, state),
      // do the upload request to the server
      Cmd.run(uploadFile, {
        successActionCreator: response => actions.fileUploadSuccess(key, file, response),
        failActionCreator: () => actions.fileUploadFail(key, file),
        args: [url, action.payload.file],
      })
    );
  },

  // handle upload success
  [actionTypes.UPLOAD_FILE_SUCCESS]: handleFileUploadOrSuccess('succeeded'),

  // handle upload error
  [actionTypes.UPLOAD_FILE_ERROR]: handleFileUploadOrSuccess('failed'),

  // handle file upload batch end
  [actionTypes.FILE_UPLOAD_BATCH_END]: (state, action) =>
    R.assocPath([action.meta.key, 'isBatchDone'], true, state),

  // clear all data related to a batch
  [actionTypes.CLEAR_BATCH]: (state, action) => R.omit([action.meta.key], state),
}, {});
