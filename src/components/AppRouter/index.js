import React from 'react';
import { Fragment } from 'redux-little-router';

import * as ROUTES from '../../constants/routes';
import { isOneOf } from '../../utils';
import Layout from '../Layout';
import HomePage from '../HomePage';
import ProjectPage from '../ProjectPage';
import ProjectDetails from '../ProjectDetails';
import PlanDetails from '../PlanDetails';
import PlanPage from '../PlanPage';
import NotFoundPage from '../NotFoundPage';

const is404Page = location => location.path === ROUTES.NOT_FOUND_PAGE;

/**
 * Main level router for the app
 */
const AppRouter = () => (
  <Fragment forRoute={ROUTES.HOME}>
    <Layout>
      <Fragment forRoute={ROUTES.HOME}>
        <HomePage />
      </Fragment>
      <Fragment withConditions={location =>
        isOneOf(location.route, [ROUTES.PROJECT, ROUTES.EDIT_PROJECT])}
      >
        <ProjectPage />
      </Fragment>
      <Fragment forRoute={ROUTES.PROJECT_DETAILS} withConditions={location => /\/project\/\d+\/?$/.test(location.pathname)}>
        <ProjectDetails />
      </Fragment>
      <Fragment forRoute={ROUTES.PLAN_DETAILS} withConditions={location => /\/plan\/\d+\/?$/.test(location.pathname)}>
        <PlanDetails />
      </Fragment>
      <Fragment withConditions={location =>
        isOneOf(location.route, [ROUTES.PLAN, ROUTES.EDIT_PLAN])}
      >
        <PlanPage />
      </Fragment>
      <Fragment forNoMatch withConditions={is404Page}>
        <NotFoundPage />
      </Fragment>
    </Layout>
  </Fragment>
);

export default AppRouter;
