import React from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'redux-little-router';
import { connect } from 'react-redux';
import { getCurrentPlan } from '../../selectors';
import { actions } from '../../redux/plans';
import * as ROUTES from '../../constants/routes';
import { formPlanUrl } from '../../utils/ajax';
import t from '../../locale';
import ShowDetails from '../ShowDetails';
import Message from '../common/Message';
import { formPlanDetailFields } from './model';
import PlanComments from '../PlanComments';
import BackToProjectButton from '../common/BackToProjectButton';
import LinkButton from '../common/LinkButton';
import Button from '../common/Button';
import LoadingOverlay from '../common/LoadingOverlay';
import './PlanDetails.css';

const mapStateToProps = state => ({
  error: state.projectDetails.error,
  plan: getCurrentPlan(state),
  isFetching: state.planDetails.isFetching,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  approvePlan: actions.approvePlan,
  removePlan: actions.removePlan,
  createNewPlanVersion: actions.createNewPlanVersion,
}, dispatch);

const mergeProps = (stateProps, actionCreators) => ({
  ...stateProps,
  ...actionCreators,
  approvePlan: () => actionCreators.approvePlan(stateProps.plan),
  removePlan: () => actionCreators.removePlan(stateProps.plan),
  createNewPlanVersion: () => actionCreators.createNewPlanVersion(stateProps.plan),
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
  error,
  approvePlan,
  removePlan,
  isFetching,
  createNewPlanVersion,
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
        {plan.approved && (
          <div>
            <div className="PlanDetails__plan-actions">
              <LinkButton
                icon="fa-pencil"
                text={t('button.edit_plan')}
                href={`${formPlanUrl(plan.projectId, plan.planId)}/edit`}
              />
              <Button
                icon="fa-plus"
                text={t('button.new_plan_version')}
                onClick={createNewPlanVersion}
              />
            </div>
            <PlanComments />
          </div>
        )}
        {!plan.approved && (
          <div className="PlanDetails__actions">
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
            <div className="row">
              <div className="twelve columns"><BackToProjectButton plan={plan} /></div>
            </div>
          </div>
        )}
      </div>
    )}
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PlanDetails);
