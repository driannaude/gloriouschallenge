import React from 'react';
import { render } from '@testing-library/react';
import { BlockNumberStatus } from './BlockNumberStatus';

const TEST_ADDRESS = '5F4bqAuskqbRULcnD72songmAj9Rk2iWuE6QDeWTfiU3caR9';
const TEST_PAYLOAD = { block_number: 123 };

jest.mock('@glorious-challenge/websockets', () => {
  return {
    ws: {
      connect: jest.fn(),
      on: jest.fn((event, handler, ...other) => {
        switch (event) {
          case 'connect':
          case 'disconnect':
            return handler();
          case 'wallet:update':
          default:
            return handler(TEST_PAYLOAD);
        }
      }),
      emit: jest.fn((event, handler) => handler()),
    },
  };
});

describe('Block number status tests', () => {
  test('it renders the component', () => {
    const component = render(<BlockNumberStatus />);
    const blockNumber = component.getByTestId('block_number');
    expect(blockNumber).toBeTruthy();
  });
  test('it renders a value when an adress has passed', async () => {
    const component = render(<BlockNumberStatus />);
    const blockNumber = component.getByTestId('block_number');
    expect(blockNumber.textContent).toEqual(
      TEST_PAYLOAD.block_number.toString()
    );
  });
});
