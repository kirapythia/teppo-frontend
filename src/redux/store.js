import { applyMiddleware, createStore } from 'redux';

import rootReducer from './rootreducer';

const middleware = [];

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  const logger = require('redux-logger').default;
  middleware.push(logger);
}

export default createStore(rootReducer, {}, applyMiddleware(...middleware));
