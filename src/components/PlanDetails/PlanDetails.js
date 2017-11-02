import React from 'react';
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { Link } from 'redux-little-router';
import { connect } from 'react-redux';
import { getCurrentPlan, getCurrentProject, getLatestPlanVersion } from '../../selectors';
import { actions as planActions } from '../../redux/plans';
import * as ROUTES from '../../constants/routes';
import PLAN_STATUS from '../../constants/plan-status';
import { formPlanUrl } from '../../utils';
import t from '../../locale';
import ShowDetails from '../ShowDetails';
import Message from '../common/Message';
import { formPlanDetailFields } from './model';
import PlanCommentsSection from '../PlanComments';
import BackToProjectButton from '../common/BackToProjectButton';
import LinkButton from '../common/LinkButton';
import Button from '../common/Button';
import LoadingOverlay from '../common/LoadingOverlay';
import PlanVersionHistory from '../PlanVersionHistory';
import './PlanDetails.css';
import RoleAuth from '../RoleAuth';
import authorized from '../../constants/user_authorization';

const mapStateToProps = (state) => {
  const project = getCurrentProject(state);
  const plan = getCurrentPlan(state);
  const latestPlan = getLatestPlanVersion(state);

  return {
    project,
    plan,
    role: state.user.role,
    error: state.projectDetails.error,
    isFetching: state.planDetails.isFetching,
    // use prop instead of propEq because it's undef safe
    readOnly: R.prop('planId', latestPlan) !== R.prop('planId', plan) ||
      (project && project.completed),
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  approvePlan: planActions.approvePlan,
  removePlan: planActions.removePlan,
  acceptToMaintenance: planActions.acceptToMaintenance,
}, dispatch);

const mergeProps = (stateProps, actionCreators) => ({
  ...stateProps,
  ...actionCreators,
  approvePlan: () => actionCreators.approvePlan(stateProps.plan),
  removePlan: () => actionCreators.removePlan(stateProps.plan),
  acceptToMaintenance: () => actionCreators.acceptToMaintenance(stateProps.plan),
});

/**
 * Plan details page component
 * @param {object} props
 * @param {Error} props.plan Current plan
 * @param {object} props.error Error from remove or approve plan actions
 * @param {function} props.approvePlan Approve plan action
 * @param {function} props.removePlan Remove plan action
 * @param {function} props.acceptToMaintenance Accept to maintenance action
 * @param {boolean} props.isFetching Is an ajax request being processed
 */
const PlanDetails = ({
  project,
  plan,
  role,
  readOnly,
  error,
  approvePlan,
  removePlan,
  acceptToMaintenance,
  isFetching,
}) => (
  <div className="PlanDetails">
    <h2>{t('plan.details.title')}</h2>

    {isFetching && <LoadingOverlay isVisible={isFetching} />}

    {error && (
      <div>
        <Message type="danger" message={error.message} />
        <Link href={ROUTES.HOME}>{t('link.back_to_home_page')}.</Link>
      </div>
    )}
    {!error && plan && (
      <div>
        <ShowDetails fields={formPlanDetailFields(plan)} />
        <div className="PlanDetails__actions text-right">
          {project.completed && plan.status === PLAN_STATUS.APPROVED && (
            <Button
              disabled={plan.maintenanceDuty}
              text={t('button.approve_to_maintenance')}
              icon="fa-check"
              onClick={acceptToMaintenance}
            />
          )}
          {!readOnly && plan.status === PLAN_STATUS.APPROVED && (
            <RoleAuth authorized={authorized.createPlanAuthorized} role={role}>
              <LinkButton
                icon="fa-plus"
                text={t('button.new_plan_version')}
                href={formPlanUrl(plan.projectId, plan.planId, 'edit')}
              />
            </RoleAuth>
          )}
        </div>
        <PlanVersionHistory />
        {!readOnly && <PlanCommentsSection /> }
        <div className="PlanDetails__actions">
          <RoleAuth authorized={authorized.approveDiscardPlanAuthorized} role={role}>
            {!readOnly && plan.status === PLAN_STATUS.WAITING_FOR_APPROVAL && (
              <div className="row">
                <div className="six columns">
                  <Button
                    className="button-red u-full-width"
                    icon="fa-times"
                    text={t('button.discard_plan')}
                    onClick={removePlan}
                    disabled={!plan.version || isFetching}
                  />
                </div>
                <div className="six columns">
                  <Button
                    className="button-green u-full-width"
                    icon="fa-check"
                    text={t('button.approve_plan')}
                    onClick={approvePlan}
                    disabled={isFetching}
                  />
                </div>
              </div>
            )}
          </RoleAuth>
          {(plan.status !== PLAN_STATUS.APPROVED || readOnly) &&
            <BackToProjectButton plan={plan} />
          }
        </div>
      </div>
    )}
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PlanDetails);
