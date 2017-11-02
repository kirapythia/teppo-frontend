import * as Routes from '../constants/routes';
import authenticate from './index';

// mock the authorization rules to prevent tests from breaking when the rules change
jest.mock('../constants/user_authorization', () => ({ '/projects': ['ADMIN'] }));

it('should pass validation if user is not defined and route is HOME', () => {
  expect(authenticate({}, { payload: { route: Routes.HOME } })).toEqual(true);
});

it('should pass validation if user is not defined and route is NOT_FOUND', () => {
  expect(authenticate({}, { payload: { route: Routes.NOT_FOUND_PAGE } })).toEqual(true);
});

it('should pass validation if user\'s role is found in authorization rules list', () => {
  expect(authenticate({ user: 'User Name', role: 'ADMIN' }, { payload: { route: '/projects' } })).toEqual(true);
});

it('should pass validation if authorization rules are not found for current route', () => {
  expect(authenticate({ user: 'User Name', role: 'ADMIN' }, { payload: { route: 'mock_route' } })).toEqual(true);
});

it('should not pass validation if user is not defined and route is neither HOME nor NOT_FOUND', () => {
  expect(authenticate({}, { payload: { route: '/projects' } })).toEqual(false);
});

it('should not pass validation if user is not defined and route is neither HOME nor NOT_FOUND', () => {
  expect(authenticate({}, { payload: { route: '/projects' } })).toEqual(false);
});

it('should not pass validation if user\'s role is not found in authorization rules list', () => {
  expect(authenticate({ user: 'User Name', role: 'VIEWER' }, { payload: { route: '/projects' } })).toEqual(false);
});
