import { loop, Cmd } from 'redux-loop';
import { push, LOCATION_CHANGED } from 'redux-little-router';
import { stopSubmit } from 'redux-form';
import t, { tpl } from '../../locale';
import reducer, { actions } from './PlanForm.ducks';
import { actions as NotificationActions } from '../Notifications';
import * as ROUTES from '../../constants/routes';
import { formProjectUrl } from '../../utils';
import { actions as FileUpload } from '../FileUploadDialog';

describe('savePlan action', () => {
  it('should set error to null', () => {
    const state = { error: new Error('error') };
    const payload = {};
    const result = reducer(state, actions.savePlan(payload));
    expect(result[0].error).toEqual(undefined);
  });

  it('should return an error action when projectId is missing from the values', () => {
    const state = {};
    const payload = { mainNo: 1, files: [{}] };
    const result = reducer(state, actions.savePlan(payload));
    const errorMsg = t('plan.error.save.no_project_id');
    expect(result).toEqual(loop(
      state,
      Cmd.action(actions.planFailAction(new Error(errorMsg))),
    ));
  });

  it('should return an error action when mainNo is missing from the values', () => {
    const state = {};
    const payload = { projectId: 1, files: [{}] };
    const result = reducer(state, actions.savePlan(payload));
    const errorMsg = t('plan.error.save.no_mainNo');
    expect(result).toEqual(loop(
      state,
      Cmd.action(actions.planFailAction(new Error(errorMsg))),
    ));
  });

  it('should return an error action when files array is missing from the values', () => {
    const state = {};
    const payload = { projectId: 1, mainNo: 2 };
    const result = reducer(state, actions.savePlan(payload));
    const errorMsg = t('plan.error.save.no_files');
    expect(result).toEqual(loop(
      state,
      Cmd.action(actions.planFailAction(new Error(errorMsg))),
    ));
  });

  it('should return an error action when files array is empty', () => {
    const state = {};
    const payload = { projectId: 1, mainNo: 2, files: [] };
    const result = reducer(state, actions.savePlan(payload));
    const errorMsg = t('plan.error.save.no_files');
    expect(result).toEqual(loop(
      state,
      Cmd.action(actions.planFailAction(new Error(errorMsg))),
    ));
  });

  it('should start file upload when validation passes', () => {
    const fileUploadReducerKey = 'planForm';
    const state = { fileUploadReducerKey };
    const payload = { projectId: 1, mainNo: 2, files: [{}] };
    const action = actions.savePlan(payload);
    const result = reducer(state, action);
    const batchAction = FileUpload.startBatch(
      fileUploadReducerKey,
      payload.files,
      action.meta.url,
    );
    expect(result).toEqual(loop(
      state,
      Cmd.action(batchAction),
    ));
  });
});

describe('File upload batch end', () => {
  it('should return state unmodified if batch key is other than planForm', () => {
    const state = {};
    const action = FileUpload.endBatch('randomKey', []);
    const result = reducer(state, action);
    expect(result).toBe(state);
  });

  it('should dispatch a clear batch and a save succeeded action when at least one file upload has been succeeded', () => {
    const files = [{ name: '1234_123.pdf' }];
    const action = FileUpload.endBatch('planForm', { succeeded: files, failed: [], responses: files });
    const result = reducer(undefined, action);

    expect(result).toEqual(loop(
      result[0],
      Cmd.list([
        Cmd.action(FileUpload.clearBatch('planForm')),
        Cmd.action(actions.planSaveSuccessAction(files)),
      ])
    ));
  });

  it('should dispatch a clear batch and a save fail action when at least one file upload has been failed', () => {
    const files = [{ name: '1234_123.pdf' }];
    const action = FileUpload.endBatch('planForm', { succeeded: [], failed: files, responses: [] });
    const result = reducer(undefined, action);

    expect(result).toEqual(loop(
      result[0],
      Cmd.list([
        Cmd.action(FileUpload.clearBatch('planForm')),
        Cmd.action(actions.planFailAction(files)),
      ])
    ));
  });
});


describe('Plan success action', () => {
  it('should return state unmodified', () => {
    const files = [{ name: '1234_123.pdf' }];
    const state = {};
    const action = actions.planSaveSuccessAction(files);
    const [result] = reducer(state, action);
    expect(result).toBe(state);
  });

  it('should display a notification for a single plan if succeeded length is 1', () => {
    const files = [{ name: '1234_123.pdf' }];
    const action = actions.planSaveSuccessAction(files);
    const projectId = '123';
    const result = reducer({ projectId }, action);
    const notification = NotificationActions.addSuccessNotification(
      tpl('plan.message.save_success', { filename: files[0].name })
    );
    expect(result).toEqual(loop(
      result[0],
      Cmd.list([
        Cmd.action(notification),
        Cmd.action(push(formProjectUrl(projectId))),
      ])
    ));
  });

  it('should display a notification for multiple plans if succeeded length is greater than 1', () => {
    const projectId = '123';
    const responses = [
      { mainNo: 1234, subNo: 111 },
      { mainNo: 1234, subNo: 222 },
      { mainNo: 1234, subNo: 333 },
    ];
    const action = actions.planSaveSuccessAction(responses);
    const result = reducer({ projectId }, action);
    const notification = NotificationActions.addSuccessNotification(
      tpl('plan.message.save_success_multiple', { count: responses.length })
    );
    expect(result).toEqual(loop(
      result[0],
      Cmd.list([
        Cmd.action(notification),
        Cmd.action(push(formProjectUrl(projectId))),
      ])
    ));
  });

  it('should display a single notification for each mainNo subNo pair', () => {
    const projectId = '123';
    const responses = [
      { mainNo: 1234, subNo: 111 },
      { mainNo: 1234, subNo: 111 },
      { mainNo: 1234, subNo: 333 },
    ];
    const action = actions.planSaveSuccessAction(responses);
    const result = reducer({ projectId }, action);
    const notification = NotificationActions.addSuccessNotification(
      tpl('plan.message.save_success_multiple', { count: responses.length - 1 })
    );
    expect(result).toEqual(loop(
      result[0],
      Cmd.list([
        Cmd.action(notification),
        Cmd.action(push(formProjectUrl(projectId))),
      ])
    ));
  });
});

describe('Plan fail action', () => {
  it('should return state unmodified', () => {
    const files = [{ name: '1234_123.pdf' }];
    const state = {};
    const action = actions.planFailAction(files);
    const [result] = reducer(state, action);
    expect(result).toBe(state);
  });

  it('should display a notification for a single plan if succeeded length is 1', () => {
    const files = [{ name: '1234_123.pdf' }];
    const action = actions.planFailAction(files);
    const result = reducer(undefined, action);
    const notification = Cmd.action(NotificationActions.addErrorNotification(
      tpl('plan.message.save_error', { filename: files[0].name })
    ));
    const stopSubmitAction = Cmd.action(stopSubmit('planForm'));
    expect(result).toEqual(loop(result[0], Cmd.list([notification, stopSubmitAction])));
  });

  it('should display a notification for multiple plans if succeeded length is greater than 1', () => {
    const files = [{ name: '1234_111.pdf' }, { name: '1234_222.pdf' }, { name: '1234_333.pdf' }];
    const action = actions.planFailAction(files);
    const result = reducer(undefined, action);
    const notification = Cmd.action(NotificationActions.addErrorNotification(
      tpl('plan.message.save_error_multiple', { count: files.length })
    ));
    const stopSubmitAction = Cmd.action(stopSubmit('planForm'));
    expect(result).toEqual(loop(result[0], Cmd.list([notification, stopSubmitAction])));
  });

  it('should display a notification for every individual plan', () => {
    const files = [{ name: '1234_222.xml' }, { name: '1234_222.pdf' }, { name: '1234_333.pdf' }];
    const action = actions.planFailAction(files);
    const result = reducer(undefined, action);
    const notification = Cmd.action(NotificationActions.addErrorNotification(
      tpl('plan.message.save_error_multiple', { count: files.length - 1 })
    ));
    const stopSubmitAction = Cmd.action(stopSubmit('planForm'));
    expect(result).toEqual(loop(result[0], Cmd.list([notification, stopSubmitAction])));
  });
});

describe('navigation to the form page', () => {
  it('should add projectId to the state', () => {
    const projectId = '123';
    const action = {
      type: LOCATION_CHANGED,
      payload: { route: ROUTES.PLAN, params: { projectId } }
    };
    const result = reducer(undefined, action);
    expect(result.projectId).toBe(projectId);
  });

  it('should not discard other state members', () => {
    const state = { error: new Error(), a: 1 };
    const action = { type: LOCATION_CHANGED, payload: { route: ROUTES.PLAN, params: {} } };
    const result = reducer(state, action);
    expect(result.a).toBe(state.a);
  });

  it('should not change state if route is other than edit or create project route', () => {
    const state = { error: new Error() };
    const action = { type: LOCATION_CHANGED, payload: { route: '/', params: {} } };
    const result = reducer(state, action);
    expect(result).toBe(state);
  });

  it('should change state if route is add project route', () => {
    const state = { error: new Error() };
    const action = { type: LOCATION_CHANGED, payload: { route: ROUTES.PLAN, params: {} } };
    const result = reducer(state, action);
    expect(result).not.toBe(state);
  });

  it('should change state if route is edit project route', () => {
    const state = { error: new Error() };
    const action = { type: LOCATION_CHANGED, payload: { route: ROUTES.EDIT_PLAN, params: {} } };
    const result = reducer(state, action);
    expect(result).not.toBe(state);
  });
});
