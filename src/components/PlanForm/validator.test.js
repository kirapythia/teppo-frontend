import * as R from 'ramda';
import t, { tpl } from '../../locale';
import * as validator from './validator';

describe('Validating when creating a plan', () => {
  it('should pass if the project has no plans', () => {
    expect(validator.validatePlans([])({})).toEqual();
  });

  it('should pass if there are no files and no plan form values', () => {
    const plans = [{ projectId: 1, mainNo: 2, subNo: 3 }];
    const values = {};
    expect(validator.validatePlans(plans)(values)).toEqual();
  });

  it('should pass if project has no plans with the same identifier combination', () => {
    const plans = [{ projectId: 1, mainNo: 2, subNo: 3 }];
    const values = { projectId: 1, mainNo: 3, subNo: 4 };
    expect(validator.validatePlans(plans)(values)).toEqual();
  });

  it('should not pass if files array contains files that are not valid plan files', () => {
    const errous = [{ name: 'abc.pdf' }, { name: 'def.xls' }];
    const values = { files: errous };
    expect(validator.validatePlans()(values).files).toEqual(tpl('validation.message.rejected_files', {
      filenames: R.pluck('name', errous).join(', '),
    }));
  });

  it('should not pass if files array contains other than xml or pdf files', () => {
    const errous = [{ name: '2001_123.pdf' }, { name: '2001_123.xls' }];
    const values = { files: errous };
    expect(validator.validatePlans()(values).files).toEqual(tpl('validation.message.rejected_files', {
      filenames: R.prop('name', errous[1]),
    }));
  });

  it('should not pass if plan already has a pdf file with same props', () => {
    const plans = [{ projectId: 1, mainNo: 2001, subNo: 123, pdfUrl: '2001_123.pdf' }];
    const values = { projectId: 1, mainNo: 2001, files: [{ name: '2001_123.pdf' }] };
    const errors = validator.validatePlans(plans)(values);
    expect(errors.files).toEqual(t('validation.message.collides_existing_plan_values'));
  });

  it('should not pass if plan already has a xml file with same props', () => {
    const plans = [{ projectId: 1, mainNo: 2001, subNo: 123, pdfUrl: '2001_123.xml' }];
    const values = { projectId: 1, mainNo: 2001, files: [{ name: '2001_123.xml' }] };
    const errors = validator.validatePlans(plans)(values);
    expect(errors.files).toEqual(t('validation.message.collides_existing_plan_values'));
  });

  it('should pass if plan already has an xml file with same props but a pdf file is being added', () => {
    const plans = [{ projectId: 1, mainNo: 2001, subNo: 123, pdfUrl: '2001_123.xml' }];
    const values = { projectId: 1, mainNo: 2001, files: [{ name: '2001_123.pdf' }] };
    const errors = validator.validatePlans(plans)(values);
    expect(errors).toEqual();
  });

  it('should pass if plan already has a pdf file with same props but an xml file is being added', () => {
    const plans = [{ projectId: 1, mainNo: 2001, subNo: 123, pdfUrl: '2001_123.pdf' }];
    const values = { projectId: 1, mainNo: 2001, files: [{ name: '2001_123.xml' }] };
    const errors = validator.validatePlans(plans)(values);
    expect(errors).toEqual();
  });

  it('should not pass if files list have double values', () => {
    const plans = [];
    const values = { projectId: 1, mainNo: 2001, files: [{ name: '2001_123.pdf' }, { name: '2001_123.pdf' }] };
    const errors = validator.validatePlans(plans)(values);
    expect(errors.files).toEqual(t('validation.message.double_plan_values'));
  });

  it('should pass if files list files with same names but with different file extensions', () => {
    const plans = [];
    const values = { projectId: 1, mainNo: 2001, files: [{ name: '2001_123.xml' }, { name: '2001_123.pdf' }] };
    const errors = validator.validatePlans(plans)(values);
    expect(errors).toEqual();
  });

  it('should pass if files list have values with same names but with different file extensions', () => {
    const plans = [];
    const values = { projectId: 1, mainNo: 2001, files: [{ name: '2001_123.pdf' }, { name: '2001_123.xml' }] };
    const errors = validator.validatePlans(plans)(values);
    expect(errors).toEqual();
  });

  it('should not pass if plan\'s main number does not match the projects main number', () => {
    const plans = [];
    const values = { projectId: 1, mainNo: 8877, files: [{ name: '2001_123.pdf' }] };
    const errors = validator.validatePlans(plans)(values);
    expect(errors.files).toEqual(t('validation.message.main_number_conflict'));
  });
});


describe('Validating while editing a plan', () => {
  it('should not pass if files contains a file with invalid filename', () => {
    const plan = { pdfUrl: '2001_123.pdf' };
    const values = { files: [{ name: '8uij.xml' }, { name: 'abdc.dwg' }] };
    const errors = validator.validateSamePlan(plan)(values);
    expect(errors.files).toEqual(tpl('validation.message.rejected_files', {
      filenames: R.pluck('name', values.files).join(', '),
    }));
  });

  it('should pass if props parsed from the filename match the props from plan\'s fileUrl', () => {
    const plan = { pdfUrl: '2001_123.pdf' };
    const values = { files: [{ name: '2001_123.pdf' }] };
    const errors = validator.validateSamePlan(plan)(values);
    expect(errors).toEqual();
  });

  it('should not pass if mainNo parsed from the filename does not match the plan\'s mainNo', () => {
    const plan = { pdfUrl: '2001_123.pdf' };
    const values = { files: [{ name: '3333_123.pdf' }] };
    const errors = validator.validateSamePlan(plan)(values);
    expect(errors.files).toEqual(t('validation.message.plan_identifier_mismatch'));
  });

  it('should not pass if subNo parsed from the filename does not match the plan\'s subNo', () => {
    const plan = { pdfUrl: '2001_123.pdf' };
    const values = { files: [{ name: '2001_333.pdf' }] };
    const errors = validator.validateSamePlan(plan)(values);
    expect(errors.files).toEqual(t('validation.message.plan_identifier_mismatch'));
  });

  it('should not pass if new files list contains double values', () => {
    const plan = { pdfUrl: '2001_123.pdf' };
    const values = { files: [{ name: '2001_123.pdf' }, { name: '2001_123.pdf' }] };
    const errors = validator.validateSamePlan(plan)(values);
    expect(errors.files).toEqual(t('validation.message.double_plan_values'));
  });
});

