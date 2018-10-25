import { reducer as formReducer } from 'redux-form';
import * as ProjectForm from '../components/ProjectForm';
import * as PlanForm from '../components/PlanForm';
import * as Notifications from '../components/Notifications';
import * as ProjectDetails from '../components/ProjectDetails';
import * as PlanDetails from '../components/PlanDetails';
import * as ProjectList from '../components/ProjectList';
import * as Comments from '../components/PlanComments';
import * as SvgRegions from '../components/SVGRegionSelect';
import * as PlanVersionHistory from '../components/PlanVersionHistory';
import projectReducer, * as Project from './project/project.reducer';
import userReducer, * as Users from './users/users.ducks';
import * as Plans from './plans';
import * as FileUpload from '../components/FileUploadDialog';

/**
 * All redux reducers as an object. Reducer name as key and reducer function as value
 * @type {object}
 */
export default {
  form: formReducer,
  [ProjectForm.NAME]: ProjectForm.reducer,
  [PlanForm.NAME]: PlanForm.reducer,
  [Notifications.NAME]: Notifications.reducer,
  [ProjectDetails.NAME]: ProjectDetails.reducer,
  [PlanDetails.NAME]: PlanDetails.reducer,
  [ProjectList.NAME]: ProjectList.reducer,
  [Comments.NAME]: Comments.reducer,
  [Project.NAME]: projectReducer,
  [Plans.NAME]: Plans.reducer,
  [Users.NAME]: userReducer,
  [SvgRegions.NAME]: SvgRegions.reducer,
  [FileUpload.NAME]: FileUpload.reducer,
  [PlanVersionHistory.NAME]: PlanVersionHistory.reducer,
};
