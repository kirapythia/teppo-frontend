import React from 'react';

import { initializeCurrentLocation } from 'redux-little-router';
import { Provider } from 'react-redux';
import AppRouter from '../AppRouter';
import store from '../../redux/store';

import Notifications from '../Notifications';
import './App.css';

// set up redux routing
const initialLocation = store.getState().router;

if (initialLocation) {
  store.dispatch(initializeCurrentLocation(initialLocation));
}

/**
 * Main app component
 */
const App = () => (
  <Provider store={store}>
    <div className="App">
      <Notifications />
      <AppRouter />
    </div>
  </Provider>
);

export default App;
