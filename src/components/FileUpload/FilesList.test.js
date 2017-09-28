import React from 'react';
import { shallow, mount } from 'enzyme';
import FilesList from './FilesList';
import t from '../../locale';

it('should render an ul element', () => {
  const component = shallow(<FilesList />);
  expect(component.is('ul')).toEqual(true);
});

it('should render a placeholder div if file is undefined', () => {
  const component = shallow(<FilesList />);
  const li = component.find('li');
  expect(li.length).toEqual(1);
  expect(li.text()).toEqual(t('files.no_files'));
});

it('should render a li for file in files list', () => {
  const file = 'filename.dwg';
  const component = shallow(<FilesList fileName={file} />);
  const li = component.find('li');
  expect(li.length).toEqual(1);
});

it('should render a li with file\'s name as key prop', () => {
  const file = 'file';
  const component = shallow(<FilesList fileName={file} />);
  expect(component.find('li').at(0).key()).toEqual(file);
});

it('should render a li with file name as a text', () => {
  const file = 'filename.dwg';
  const component = shallow(<FilesList fileName={file} />);
  const li = component.find('li');
  expect(li.find('div').at(1).text()).toEqual(file);
});

it('should render a link element if filename is an url', () => {
  const file = 'http://filename.dwg';
  const component = shallow(<FilesList fileName={file} />);
  const li = component.find('li');
  const link = li.find('a');
  expect(link.length).toEqual(1);
  expect(link.prop('href')).toEqual(file);
  expect(link.text()).toEqual(file.replace('http://', ''));
});

it('should render a link element with file name without url parts as a text', () => {
  const file = 'http://filename.dwg';
  const component = shallow(<FilesList fileName={file} />);
  const li = component.find('li');
  const link = li.find('a');
  expect(link.text()).toEqual(file.replace('http://', ''));
});

it('should render a li with file icon', () => {
  const file = 'file';
  const component = shallow(<FilesList fileName={file} />);
  const icon = component
    .find('li')
    .find('i.fa-file-text');

  expect(icon.length).toEqual(1);
});

it('should render a IconButton', () => {
  const file = 'file';
  const component = mount(<FilesList fileName={file} />);
  const icon = component
    .find('li')
    .find('i.fa-times');

  expect(icon.length).toEqual(1);
});

it('should invoke removeFile on IconButton click', () => {
  const fileName = 'file';
  const props = { removeFile: () => {}, fileName };
  jest.spyOn(props, 'removeFile');
  const component = mount(<FilesList {...props} />);

  component
    .find('i.fa-times')
    .at(0)
    .simulate('click');

  expect(props.removeFile).toHaveBeenCalled();
});
