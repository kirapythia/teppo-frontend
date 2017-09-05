import { push, LOCATION_CHANGED } from 'redux-little-router';
import authenticate from '../authentication';
import { HOME } from '../constants/routes';

/**
 * Middleware for route authentication. Validates every
 * route change, redirects to home page if validation fails.
 */
const authenticationMiddleware = () => next => action =>
  ((action.type !== LOCATION_CHANGED || authenticate())
    ? next(action)
    : next(push(HOME)));

export default authenticationMiddleware;
