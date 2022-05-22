import React from 'react';
import { render } from '@testing-library/react';
import { BlockNumberStatus } from './BlockNumberStatus';

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
          case 'chain:update':
          default:
            return handler(TEST_PAYLOAD);
        }
      }),
      emit: jest.fn((event, handler) => handler()),
    },
  };
});

afterAll(() => {
  jest.clearAllMocks();
});

describe('Block number status tests', () => {
  test('it renders the component', () => {
    const component = render(<BlockNumberStatus />);
    const blockNumber = component.getByTestId('block_number');
    expect(blockNumber).toBeTruthy();
  });
  test('it renders a value when the websocket updates', async () => {
    const component = render(<BlockNumberStatus />);
    const blockNumber = component.getByTestId('block_number');
    expect(blockNumber.textContent).toEqual(
      TEST_PAYLOAD.block_number.toString()
    );
  });
});
