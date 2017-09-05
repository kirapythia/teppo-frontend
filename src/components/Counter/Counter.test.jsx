import React from 'react';
import { shallow } from 'enzyme';
import { Counter } from './Counter';

describe('Counter', () => {
  it('should render a div', () => {
    const component = shallow(<Counter />);
    expect(component.is('div')).toEqual(true);
  });

  it('should render an increment button', () => {
    const component = shallow(<Counter />);
    expect(component.find('button.increment').length).toEqual(1);
  });

  it('should render an decrement button', () => {
    const component = shallow(<Counter />);
    expect(component.find('button.decrement').length).toEqual(1);
  });
});
