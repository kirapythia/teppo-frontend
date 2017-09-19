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

/* eslint-disable no-underscore-dangle */
const composeEnhancers = process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;
/* eslint-enable no-underscore-dangle */

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
  composeEnhancers(install(), routerEnhancer, applyMiddleware(...middleware))
);
