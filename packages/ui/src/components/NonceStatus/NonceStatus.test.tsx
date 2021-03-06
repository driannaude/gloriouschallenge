import React from 'react';
import { render } from '@testing-library/react';
import { NonceStatus } from './NonceStatus';

const TEST_ADDRESS = '5F4bqAuskqbRULcnD72songmAj9Rk2iWuE6QDeWTfiU3caR9';
const TEST_PAYLOAD = { nonce: 123, balance: 123 };

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

afterAll(() => {
  jest.clearAllMocks();
});

describe('Nonce status tests', () => {
  test('it renders the component', () => {
    const component = render(<NonceStatus address={TEST_ADDRESS} />);
    const nonce = component.getByTestId('nonce');
    expect(nonce).toBeTruthy();
  });
  test('it renders a value when an adress has passed and the websocket updates', async () => {
    const component = render(<NonceStatus address={TEST_ADDRESS} />);
    const nonce = component.getByTestId('nonce');
    expect(nonce.textContent).toEqual(TEST_PAYLOAD.nonce.toString());
  });

  test('it does not render a value if address is empty', async () => {
    const component = render(<NonceStatus />);
    const nonce = component.getByTestId('nonce');
    expect(nonce.textContent).toEqual('-');
  });
});
