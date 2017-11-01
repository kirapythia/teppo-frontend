import * as R from 'ramda';
import { combineActions, createAction, handleActions } from 'redux-actions';
import { loop, Cmd } from 'redux-loop';
import { push, LOCATION_CHANGED } from 'redux-little-router';
import { stopSubmit } from 'redux-form';
import { validateOnSave } from './validator';
import { actions as NotificationActions } from '../Notifications';
import { tpl } from '../../locale';
import * as ROUTES from '../../constants/routes';
import { formProjectUrl, formPlanIdentifier } from '../../utils';
import { formPlanApiUrl } from '../../utils/ajax';
import { parsePlanProps } from '../../utils/PlanFilenameParser';
import * as FileUpload from '../FileUploadDialog';
/**
 * Export reducer's name. Will be registerd to
 * the application state with this name
 */
export const NAME = 'planForm';

const SAVE_PLAN = 'pythia-webclient/ProjectForm/SAVE_PLAN';
const VERSION_PLAN = 'pythia-webclient/ProjectForm/VERSION_PLAN';
const PLAN_FAIL = 'pythia-webclient/ProjectForm/PLAN_FAIL';

export const actionTypes = {
  PLAN_SAVE_SUCCESS: 'pythia-webclient/ProjectForm/PLAN_SAVE_SUCCESS',
};

const selectIndividualPlans = R.pipe(
  R.defaultTo([]),
  R.pluck('name'),
  R.uniqBy(R.pipe(parsePlanProps, formPlanIdentifier)),
);

export const actions = {
  /**
   * Send a newly created plan to the server
   * @param {object} formValues Values from the plan form
   * @return {object} action object
   */
  savePlan: createAction(
    SAVE_PLAN,
    R.identity,
    ({ projectId }) => ({ url: `${formPlanApiUrl({ projectId })}` }),
  ),

  /**
   * Create a new version of a plan
   * @param {object} formValues
   * @return {object} action object
   */
  versionPlan: createAction(
    VERSION_PLAN,
    R.identity,
    ({ projectId }) => ({ url: `${formPlanApiUrl({ projectId })}?version=true` }),
  ),
  /**
   * Action triggered if the createProject action succeeds
   * @param {object} plan plan object received from the server
   * @return {object}
   */
  planSaveSuccessAction: createAction(
    actionTypes.PLAN_SAVE_SUCCESS,
  ),
  /**
   * Action triggered if the createAction project fails
   * @param {Error} err
   * @return {object}
   */
  planFailAction: createAction(
    PLAN_FAIL,
  ),
};

const initialState = {
  fileUploadReducerKey: 'planForm',
};

// ProjectForm reducer
export default handleActions({
  [LOCATION_CHANGED]: (state, action) => {
    const { route } = action.payload;
    const { projectId } = action.payload.params;

    // clear error when entering the form
    if (R.contains(route, [ROUTES.PLAN, ROUTES.EDIT_PLAN])) {
      return { ...state, projectId };
    }
    return state;
  },
  // handle savePlan and versionPlan actions
  // return redux loop command like object that will be
  // interpreted by redux-loop middleware
  [combineActions(SAVE_PLAN, VERSION_PLAN)]: (state, action) => {
    const errors = validateOnSave(action.payload);
    const effect = errors
      // errors cause plan fail action as a side effect
      ? actions.planFailAction(new Error(R.values(errors).join(', ')))
      // if validation passes then start file upload batch
      : FileUpload.actions.startBatch(
        state.fileUploadReducerKey,
        action.payload.files,
        action.meta.url,
      );

    return loop(
      // remove error from the state
      R.omit(['error'], state),
      // middleware will run an action depending on validation result
      Cmd.action(effect),
    );
  },
  // handle batch end action
  [FileUpload.actionTypes.FILE_UPLOAD_BATCH_END]: (state, action) => {
    // do not react to batch end actions that doesn't concern planForm
    if (action.meta.key !== 'planForm') return state;

    const { responses, failed } = action.payload;
    const effects = R.filter(Boolean, [
      FileUpload.actions.clearBatch('planForm'),
      !!responses.length && actions.planSaveSuccessAction(responses),
      !!failed.length && actions.planFailAction(failed),
    ]);

    return loop(state, Cmd.list(effects.map(effect => Cmd.action(effect))));
  },
  // handle plan save success action
  [actionTypes.PLAN_SAVE_SUCCESS]: (state, action) => {
    const individualPlans = R.uniqBy(formPlanIdentifier, action.payload);
    return loop(
      state,
      Cmd.list([
        // display a success notification for succeeded files
        Cmd.action(NotificationActions.addSuccessNotification(
          individualPlans.length > 1
            ? tpl('plan.message.save_success_multiple', { count: individualPlans.length })
            : tpl('plan.message.save_success', { ...individualPlans[0] })
        )),
        // navigate to the project details page
        Cmd.action(push(formProjectUrl(state.projectId))),
      ])
    );
  },
  // handle savePlan fail action
  [PLAN_FAIL]: (state, action) => {
    const individualPlans = selectIndividualPlans(action.payload);
    return loop(
      state,
      Cmd.list([
        // display an error notification for failed files
        Cmd.action(NotificationActions.addErrorNotification(
          individualPlans.length > 1
            ? tpl('plan.message.save_error_multiple', { count: individualPlans.length })
            : tpl('plan.message.save_error', { filename: individualPlans[0] })
        )),
        Cmd.action(stopSubmit('planForm')),
      ])
    );
  },
}, initialState);
