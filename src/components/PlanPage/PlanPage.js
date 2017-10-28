import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import t from '../../locale';
import { versionToCharacter } from '../../utils';
import { getCurrentPlan, getCurrentProject } from '../../selectors';
import ShowDetails from '../ShowDetails';
import PlanForm from '../PlanForm';
import FileUploadDialog from '../FileUploadDialog';
import './PlanPage.css';

const mapStateToProps = state => ({
  project: getCurrentProject(state),
  plan: getCurrentPlan(state),
  fileUploadReducerKey: state.planForm.fileUploadReducerKey,
});

const formDetailFields = values => R.filter(Boolean, [
  { label: t('project.name'), value: values.name },
  { label: t('project.hansuProjectId'), value: values.hansuProjectId },
  { label: t('plan.primary_id'), value: values.mainNo },
  values.subNo && { label: t('plan.secondary_id'), value: values.subNo },
  !R.isNil(values.version) && { label: t('common.version'), value: versionToCharacter(values.version) },
]);

/**
 * Page for creating a new plan
 * @param {object} props
 * @param {object} props.plan
 * @param {object} props.project
 */
const PlanPage = ({ plan, project = {}, fileUploadReducerKey }) => (
  <div className="PlanPage">
    <h2>{ plan ? t('plan.create_new_version') : t('plan.add.header') }</h2>
    <ShowDetails
      fields={formDetailFields({ ...project, ...(plan || {}) })}
      className="ShowDetails--highlighted"
    />

    <PlanForm plan={plan} />

    <FileUploadDialog
      reducerKey={fileUploadReducerKey}
      title={t('plan.fileupload_dialog.title')}
    />
  </div>
);

export default connect(mapStateToProps)(PlanPage);
