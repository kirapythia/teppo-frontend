import React from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'redux-little-router';
import { connect } from 'react-redux';
import { getCurrentPlan, getCurrentProject } from '../../selectors';
import { actions } from '../../redux/plans';
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

  return {
    role: state.user.role,
    error: state.projectDetails.error,
    plan: getCurrentPlan(state),
    isFetching: state.planDetails.isFetching,
    readOnly: project && project.completed,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  approvePlan: actions.approvePlan,
  removePlan: actions.removePlan,
}, dispatch);

const mergeProps = (stateProps, actionCreators) => ({
  ...stateProps,
  ...actionCreators,
  approvePlan: () => actionCreators.approvePlan(stateProps.plan),
  removePlan: () => actionCreators.removePlan(stateProps.plan),
});

/**
 * Plan details page component
 * @param {object} props
 * @param {Error} props.plan Current plan
 * @param {object} props.error Error from remove or approve plan actions
 * @param {function} props.approvePlan Approve plan action
 * @param {function} props.removePlan Remove plan action
 * @param {boolean} props.isFetching Is an ajax request being processed
 */
const PlanDetails = ({
  role,
  plan,
  readOnly,
  error,
  approvePlan,
  removePlan,
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
        {!readOnly && plan.status === PLAN_STATUS.APPROVED && (
          <div className="text-right">
            <RoleAuth authorized={authorized.createPlanAuthorized} role={role}>
              <LinkButton
                icon="fa-plus"
                text={t('button.new_plan_version')}
                href={formPlanUrl(plan.projectId, plan.planId, 'edit')}
              />
            </RoleAuth>
          </div>
        )}
        <PlanVersionHistory />
        <PlanCommentsSection />
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
          {plan.status !== PLAN_STATUS.APPROVED && <BackToProjectButton plan={plan} />}
        </div>
      </div>
    )}
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PlanDetails);
