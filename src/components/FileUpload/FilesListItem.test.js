import React from 'react';
import { shallow, mount } from 'enzyme';
import FilesListItem from './FilesListItem';

it('should render an ul element', () => {
  const component = shallow(<FilesListItem />);
  expect(component.is('li')).toEqual(true);
});

it('should render a li with file name as a text', () => {
  const file = 'filename.dwg';
  const component = shallow(<FilesListItem file={file} />);
  const li = component.find('li');
  expect(li.find('div').at(1).text()).toEqual(file);
});

it('should render a link element if filename is an url', () => {
  const file = 'http://filename.dwg';
  const component = shallow(<FilesListItem file={file} />);
  const li = component.find('li');
  const link = li.find('a');
  expect(link.length).toEqual(1);
  expect(link.prop('href')).toEqual(file);
  expect(link.text()).toEqual(file.replace('http://', ''));
});

it('should render a link element with file name without url parts as a text', () => {
  const file = 'http://filename.dwg';
  const component = shallow(<FilesListItem file={file} />);
  const li = component.find('li');
  const link = li.find('a');
  expect(link.text()).toEqual(file.replace('http://', ''));
});

it('should render a li with file icon', () => {
  const file = 'file';
  const component = shallow(<FilesListItem file={file} />);
  const icon = component
    .find('li')
    .find('i.fa-file-text');

  expect(icon.length).toEqual(1);
});

it('should render a IconButton', () => {
  const file = 'file';
  const component = mount(<FilesListItem file={file} />);
  const icon = component
    .find('li')
    .find('i.fa-times');

  expect(icon.length).toEqual(1);
});

it('should invoke removeFile on IconButton click', () => {
  const file = 'file';
  const props = { removeFile: () => {}, file };
  jest.spyOn(props, 'removeFile');
  const component = mount(<FilesListItem {...props} />);

  component
    .find('i.fa-times')
    .at(0)
    .simulate('click');

  expect(props.removeFile).toHaveBeenCalledWith(file);
});

