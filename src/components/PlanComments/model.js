import { formCommentApiUrl, postJSON, putJSON, ServerResponseError } from '../../utils/ajax';
import { withTimeout } from '../../utils';
import t from '../../locale';

/**
 * Send comment to the server
 * @async
 * @param {object} plan
 * @param {object} comment
 * @return {Promise}
 */
export const saveComment = (plan, comment) =>
  withTimeout(2 * 60 * 1000, postJSON(formCommentApiUrl(plan), comment)
    .catch(error => Promise.reject(new ServerResponseError(t('network.error.comment.save'), error.status))));

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
    putJSON(formCommentApiUrl({ ...plan, ...comment }), comment)
      .catch(error => Promise.reject(new ServerResponseError(t('network.error.comment.edit'), error.status)))
  );

  /**
   * Add or update a comment in comments-by-id map
   * @param {object} comments comments map (by id)
   * @param {object} comment comment object
   */
export const updateComment = (comments, comment) =>
  ({ ...comments, [comment.textId]: comment });
