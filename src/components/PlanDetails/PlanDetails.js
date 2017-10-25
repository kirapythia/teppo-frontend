import React from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'redux-little-router';
import { connect } from 'react-redux';
import { getCurrentPlan, getCurrentProject } from '../../selectors';
import { actions } from '../../redux/plans';
import * as ROUTES from '../../constants/routes';
import PLAN_STATUS from '../../constants/plan-status';
import { formProjectUrl } from '../../utils';
import t from '../../locale';
import ShowDetails from '../ShowDetails';
import Message from '../common/Message';
import { formPlanDetailFields } from './model';
import PlanCommentsSection from '../PlanComments';
import BackToProjectButton from '../common/BackToProjectButton';
import LinkButton from '../common/LinkButton';
import Button from '../common/Button';
import LoadingOverlay from '../common/LoadingOverlay';
import './PlanDetails.css';

const mapStateToProps = (state) => {
  const project = getCurrentProject(state);

  return {
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
          <div>
            <div className="text-right">
              <LinkButton
                icon="fa-plus"
                text={t('button.new_plan_version')}
                href={formProjectUrl(plan.projectId, 'plan/new')}
              />
            </div>
          </div>
        )}

        <PlanCommentsSection />

        <div className="PlanDetails__actions">
          {!readOnly && !plan.status === PLAN_STATUS.APPROVED && (
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
          <div className="row">
            <div className="twelve columns"><BackToProjectButton plan={plan} /></div>
          </div>
        </div>
      </div>
    )}
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PlanDetails);
