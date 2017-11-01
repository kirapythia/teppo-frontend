import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from './PlanVersionHistory.ducks';
import { listAllPlanVersions, getCurrentProject } from '../../selectors';
import t from '../../locale';
import IconButton from '../common/IconButton';
import LoadingOverlay from '../common/LoadingOverlay';
import './PlanVersionHistory.css';
import PlansList from '../PlansList';

const mapStateToProps = state => ({
  project: getCurrentProject(state),
  error: state.planVersionHistory.error,
  isFetching: state.planVersionHistory.isFetching,
  isToggled: state.planVersionHistory.isToggled,
  allVersions: listAllPlanVersions(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  togglePlanHistory: actions.togglePlanHistory,
}, dispatch);

const mergeProps = (stateProps, actionCreators) => ({
  ...stateProps,
  ...actionCreators,
  togglePlanHistory: () => actionCreators.togglePlanHistory(stateProps.project),
});

/**
 * Togglable container for displaying plan's all versions in a list
 * @param {object} props
 * @param {object} props.project
 * @param {object[]} props.allVersions
 * @param {boolean} props.isToggled
 * @param {boolean} props.isFetching
 */
const PlanVersionHistory = ({
  project,
  allVersions = [],
  togglePlanHistory,
  isToggled,
  isFetching,
}) => (
  <section className="PlanVersionHistory">
    <div className="PlanVersionHistory__title">
      <h3>{t('plan.version_history.title')}</h3>
      <IconButton
        className={`fa-lg ${isToggled ? 'fa-minus' : 'fa-plus'}`}
        onClick={togglePlanHistory}
      />
    </div>
    {isToggled && (
      <div className="PlanVersionHistory__list-container">
        <LoadingOverlay
          text={t('plan.version_history.loading')}
          isVisible={isFetching}
          size="small"
        />
        <PlansList
          placeholderText=""
          project={project}
          plans={allVersions}
        />
      </div>
    )}
  </section>
);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PlanVersionHistory);
