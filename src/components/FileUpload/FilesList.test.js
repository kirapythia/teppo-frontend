import React from 'react';
import { shallow } from 'enzyme';
import FilesList from './FilesList';
import FilesListItem from './FilesListItem';
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
  const component = shallow(<FilesList files={['filename.dwg']} />);
  const li = component.find(FilesListItem);
  expect(li.length).toEqual(1);
});

it('should render a li with file\'s name as key prop', () => {
  const file = 'file';
  const component = shallow(<FilesList files={[file]} />);
  expect(component.find(FilesListItem).at(0).key()).toEqual(file);
});
