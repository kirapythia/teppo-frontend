import React from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'redux-little-router';
import { connect } from 'react-redux';
import { getCurrentPlan } from '../../selectors';
import { actions } from '../../redux/plans';
import * as ROUTES from '../../constants/routes';
import t from '../../locale';
import ShowDetails from '../ShowDetails';
import Message from '../common/Message';
import { formPlanDetailFields } from './model';
import PlanComments from '../PlanComments';
import BackToProjectButton from '../common/BackToProjectButton';
import SpinnerButton from '../common/SpinnerButton';
import './PlanDetails.css';

/**
 * Format detail values for the ShowDetails component
 * @private
 * @type {function}
 * @param {object} plan
 * @return {object}
 */
const mapStateToProps = state => ({
  error: state.projectDetails.error,
  plan: getCurrentPlan(state),
  isApproving: state.planDetails.isApproving,
  isRemoving: state.planDetails.isRemoving,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  approvePlan: actions.approvePlan,
  removePlan: actions.removePlan,
}, dispatch);

/**
 * Plan details page component
 * @param {object} props
 * @param {Error} props.plan
 * @param {object} props.error
 */
const PlanDetails = ({ plan, error, approvePlan, removePlan, isApproving, isRemoving }) => (
  <div className="PlanDetails">
    <h2>{t('plan.details.title')}</h2>
    {error && (
      <div>
        <Message type="danger" message={error.message} />
        <Link href={ROUTES.HOME}>{t('link.back_to_home_page')}.</Link>
      </div>
    )}
    {!error && plan && (
      <div>
        <ShowDetails
          fields={formPlanDetailFields(plan)}
        />
        {plan.approved && (
          <div>
            <div>
              {/* new plan version button*/}
            </div>
            <PlanComments />
          </div>
        )}
        {!plan.approved && (
          <div className="PlanDetails__actions">
            <div className="row">
              <div className="six columns">
                <SpinnerButton
                  isSubmitting={isRemoving}
                  className="button button-red u-full-width"
                  texts={[t('button.discard_plan')]}
                  defaultIconClass="fa fa-times"
                  buttonProps={{
                    onClick: () => removePlan(plan),
                    disabled: !plan.version || isApproving,
                  }}
                />
              </div>
              <div className="six columns">
                <SpinnerButton
                  isSubmitting={isApproving}
                  className="button button-green u-full-width"
                  texts={[t('button.approve_plan')]}
                  defaultIconClass="fa fa-check"
                  buttonProps={{
                    type: 'button',
                    onClick: () => approvePlan(plan),
                    disabled: isApproving || isRemoving,
                  }}
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

export default connect(mapStateToProps, mapDispatchToProps)(PlanDetails);
