import React from 'react';
import { Fragment } from 'redux-little-router';

import * as ROUTES from '../../constants/routes';
import Layout from '../Layout';
import HomePage from '../HomePage';
import ProjectPage from '../ProjectPage';
import ProjectDetails from '../ProjectDetails';
import PlanPage from '../PlanPage';


const Page = Component => <Layout><Component /></Layout>;

/**
 * Main level router for the app
 */
const AppRouter = () => (
  <Fragment forRoute={ROUTES.HOME}>
    <div className="full-height">
      <Fragment forRoute={ROUTES.HOME}>
        { Page(HomePage) }
      </Fragment>
      <Fragment forRoute={ROUTES.PROJECT}>
        { Page(ProjectPage) }
      </Fragment>
      <Fragment forRoute={ROUTES.PROJECT_DETAILS} withConditions={location => /\/project\/\d+$/.test(location.pathname)} >
        { Page(ProjectDetails) }
      </Fragment>
      <Fragment forRoute={ROUTES.PLAN}>
        { Page(PlanPage) }
      </Fragment>
    </div>
  </Fragment>
);

export default AppRouter;
