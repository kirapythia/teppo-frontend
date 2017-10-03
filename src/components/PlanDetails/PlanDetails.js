import React from 'react';
import { Link } from 'redux-little-router';
import { connect } from 'react-redux';
import { getCurrentPlan } from '../../selectors';

import * as ROUTES from '../../constants/routes';
import t from '../../locale';
import ShowDetails from '../ShowDetails';
import Message from '../common/Message';
import { omit } from '../../utils';

const mapStateToProps = state => ({
  error: state.projectDetails.error,
  plan: getCurrentPlan(state),
});


const PlanDetails = ({ error, plan }) => (
  <div>
    {error && (
      <div>
        <Message type="danger" message={error.message} />
        <Link href={ROUTES.HOME}>{t('link.back_to_home_page')}.</Link>
      </div>
    )}
    {!error && plan && (
      <div>
        <ShowDetails
          title={plan.planId}
          details={omit(['planId'], plan)}
        />

      </div>
    )

    }
  </div>
);

export default connect(mapStateToProps)(PlanDetails);
