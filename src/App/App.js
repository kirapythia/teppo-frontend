import React from 'react';

import { Provider } from 'react-redux';
import AppRouter from '../AppRouter';
import store from '../redux/store';

import './App.css';

const App = () => (
  <Provider store={store}>
    <div className="App">
      <AppRouter />
    </div>
  </Provider>
);

export default App;
