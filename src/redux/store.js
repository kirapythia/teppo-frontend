import { applyMiddleware, compose, createStore } from 'redux';
import { routerForBrowser } from 'redux-little-router';
import { combineReducers, install } from 'redux-loop';

import authenticationMiddleware from './authentication-middleware';
import routes from '../constants/routes';
import reducers from './reducers';

// initialize redux router
const {
  reducer: routerReducer,
  middleware: routerMiddleware,
  enhancer: routerEnhancer,
} = routerForBrowser({ routes });

// redux middleware
const middleware = [
  routerMiddleware,
  authenticationMiddleware,
];

// only use logger in development environment
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  const logger = require('redux-logger').default;
  middleware.push(logger);
}

/**
 * App store
 * @type {Redux.Store}
 */
export default createStore(
  // combine all reducers
  combineReducers({ ...reducers, router: routerReducer }),
  // initial state
  {},
  // apply all the middleware
  compose(install(), routerEnhancer, applyMiddleware(...middleware))
);
