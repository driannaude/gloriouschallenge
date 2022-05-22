import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SearchBox } from './SearchBox';

describe('Search box tests', () => {
  test('it renders the component', () => {
    const component = render(<SearchBox placeholderText="Search" />);
    const input = component.getByTestId('search-input');
    const iconButton = component.getByTestId('search-button');
    expect(input).toBeTruthy();
    expect(iconButton).toBeTruthy();
  });

  test('it renders the placeholderText correctly', () => {
    const component = render(<SearchBox placeholderText="Search" />);
    const input = component.getByLabelText('Search');
    expect(input).toBeTruthy();
  });
  test('initializes as an empty string', () => {
    const component = render(<SearchBox placeholderText="Search" />);
    const input = component.getByTestId('search-input');
    expect(input.value).toBe('');
  });

  test('changing the value of the input updates the state', () => {
    const component = render(<SearchBox placeholderText="Search" />);
    const input = component.getByTestId('search-input');

    fireEvent.change(input, {
      target: {
        value: 'test',
      },
    });

    expect(input.value).toBe('test');
  });
});
