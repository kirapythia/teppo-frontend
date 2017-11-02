// import * as Routes from '../constants/routes';
import authorized from '../constants/user_authorization';

/**
 * Authorize current user. Return false if the user doesn't have sufficient rights
 * to perform an action. FIXME: not actually implemented yet!
 * @return {boolean}
 */


const authenticate = (user, action) => {
  const rules = authorized[action.payload.route];
  if (!user) return false;
  return rules ?
    (rules.indexOf(user.role) > -1)
    : true;
};

export default authenticate;
