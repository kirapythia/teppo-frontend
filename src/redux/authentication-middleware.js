import { push, LOCATION_CHANGED } from 'redux-little-router';
import authenticate from '../authentication';
import { HOME } from '../constants/routes';

/**
 * Middleware for route authentication. Validates every
 * route change, redirects to home page if validation fails.
 */
const authenticationMiddleware = store => next => action =>
  ((action.type !== LOCATION_CHANGED || authenticate(store.getState().user, action))
    ? next(action)
    : next(push(HOME)));

export default authenticationMiddleware;
