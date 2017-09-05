import authenticate from './index';

it('should pass validation', () => {
  expect(authenticate()).toEqual(true);
});
