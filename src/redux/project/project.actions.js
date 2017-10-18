import { createAction } from 'redux-actions';
import * as actionTypes from './project.actiontypes';

/**
 * Project related actions
 * @namespace ProjectActions
 */

/**
 * Project success action
 * @param {object} project Updated project object received from the server
 * @return {object}
 */
export const projectUpdateSuccess = createAction(
  actionTypes.PROJECT_UPDATE_SUCCESS,
);

/**
 * Project fail action
 * @param {Error} error Error object received from the server
 * @return {object}
 */
export const projectUpdateError = createAction(
  actionTypes.PROJECT_UPDATE_ERROR,
);
