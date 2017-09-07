import React from 'react';
import { reduxForm } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { createFieldsWithValidations } from '../../forms/form-utils';
import fields from '../../forms/plan';

import FormFields from '../Form/FormFields';
import FormCancelButton from '../Form/FormCancelButton';
import FormSubmitButton from '../Form/FormSubmitButton';

const formConfig = {
  form: 'planForm',
  destroyOnUnmount: true,
};

// form field configuration objects with validator functions from field definitions
const fieldsWithValidations = createFieldsWithValidations(fields);

const mapStateToProps = state => ({
  projectId: state.router.params.projectId,
});

const onSubmit = () => ({});

/**
 * Form for creating a new project
 * @param {Object} props
 * @param {function} props.handleSubmit
 */
const PlanForm = ({
  handleSubmit,
  valid,
  pristine,
  submitting,
  projectId,
}) => (
  <form className="PlanForm" onSubmit={handleSubmit(onSubmit)}>
    <FormFields fields={fieldsWithValidations} />

    <div className="row">
      <div className="column column-40">
        <FormCancelButton href={`/project/${projectId}`} />
      </div>
      <div className="column column-40 column-offset-20">
        <FormSubmitButton disabled={!valid || pristine || submitting} />
      </div>
    </div>
  </form>
);

export default compose(
  connect(mapStateToProps),
  reduxForm(formConfig)
)(PlanForm);
