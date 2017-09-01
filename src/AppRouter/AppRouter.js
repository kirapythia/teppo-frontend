import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import * as ROUTES from '../constants/routes';
import HomePage from '../HomePage';
import ProjectPage from '../ProjectPage';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.PROJECT} component={ProjectPage} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
