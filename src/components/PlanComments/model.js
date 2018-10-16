import * as R from 'ramda';
import { formCommentApiUrl, postJSON, putJSON, ServerResponseError, uploadFile } from '../../utils/ajax';
import { withTimeout } from '../../utils';
import t from '../../locale';

/**
 * Save comment json entity
 * @param {object} plan
 * @param {object} comment
 * @return {Promise}
 */
const saveCommentEntity = (plan, comment) =>
  withTimeout(2 * 60 * 1000, postJSON(formCommentApiUrl(plan), comment));

/**
 * Save comment and it's attachment file to the server
 * @async
 * @param {object} plan
 * @param {object} comment
 * @return {Promise}
 */
export const saveComment = async (plan, values) => {
  const file = R.head(R.propOr([], 'files', values));

  try {
    const comment = await saveCommentEntity(plan, values);
    if (!file) return comment;
    const fileUploadResult = await uploadFile(formCommentApiUrl(plan, comment, 'files'), file);
    return fileUploadResult;
  } catch (e) {
    throw new ServerResponseError(t('network.error.comment.save'), e.status);
  }
};

/**
 * Edit comment
 * @async
 * @param {object} plan
 * @param {object} comment
 * @return {Promise}
 */
export const editComment = (plan, comment) =>
  withTimeout(
    2 * 60 * 1000,
    putJSON(formCommentApiUrl(plan, comment), comment)
      .catch(error => Promise.reject(new ServerResponseError(t('network.error.comment.edit'), error.status)))
  );

  /**
   * Add or update a comment in comments-by-id map
   * @param {object} comments comments map (by id)
   * @param {object} comment comment object
   */
export const updateComment = (comments, comment) =>
  ({ ...comments, [comment.ptextId]: comment });
