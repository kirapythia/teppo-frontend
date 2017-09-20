import React from 'react';
import { shallow } from 'enzyme';
import UserPanel from './UserPanel';

it('should render a div', () => {
  const component = shallow(<UserPanel />);
  expect(component.is('div')).toEqual(true);
});

it('should render a div with component className', () => {
  const component = shallow(<UserPanel />);
  expect(component.is('.UserPanel')).toEqual(true);
});

it('should display user\'s name', () => {
  const user = { name: 'Sirpa Suunnittelija' };
  const component = shallow(<UserPanel user={user} />);
  expect(component.find('.UserPanel__name').text()).toEqual(user.name);
});

it('should display a user icon', () => {
  const user = { name: 'Sirpa Suunnittelija' };
  const component = shallow(<UserPanel user={user} />);
  expect(component.find('.fa.fa-user').length).toEqual(1);
});
