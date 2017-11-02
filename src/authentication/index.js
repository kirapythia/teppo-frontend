import { HOME, NOT_FOUND_PAGE } from '../constants/routes';
import authorized from '../constants/user_authorization';

/**
 * Authorize current user. Return false if the user doesn't have sufficient rights
 * to perform an action. FIXME: not actually implemented yet!
 * @return {boolean}
 */


const authenticate = (user, action) => {
  const { route } = action.payload;
  const rules = authorized[route];
  // if user is not present then check the route
  // the home page and the 404 page does not require login
  if (!user.user) return [HOME, NOT_FOUND_PAGE].indexOf(route) > -1;
  // if rules for a page transition exist then check that user's
  // role is permitted to access this route otherwise all users
  // are allowed
  return !rules || rules.indexOf(user.role) > -1;
};

export default authenticate;
