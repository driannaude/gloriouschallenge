import React from 'react';
import { render } from '@testing-library/react';
import { BalanceStatus } from './BalanceStatus';

const TEST_ADDRESS = '5F4bqAuskqbRULcnD72songmAj9Rk2iWuE6QDeWTfiU3caR9';
const TEST_PAYLOAD = {
  address: TEST_ADDRESS,
  balance: 123,
  nonce: 123,
};

jest.mock('@glorious-challenge/websockets', () => {
  const websockets = {
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
    },
  };
  websockets.ws.emit = jest.fn((event, data) =>
    websockets.ws.on(event, (data) => null)
  );
  return websockets;
});

afterAll(() => {
  jest.clearAllMocks();
});

describe('Balance status tests', () => {
  test('it renders the component', () => {
    const component = render(<BalanceStatus />);
    const blockNumber = component.getByTestId('balance');
    expect(blockNumber).toBeTruthy();
  });
  test('it renders a value when an adress has passed and the websocket updates', async () => {
    const component = render(<BalanceStatus address={TEST_ADDRESS} />);
    const nonce = component.getByTestId('balance');
    expect(nonce.textContent).toEqual(TEST_PAYLOAD.nonce.toString());
  });

  test('it does not render a value if address is empty', async () => {
    const component = render(<BalanceStatus />);
    const nonce = component.getByTestId('balance');
    expect(nonce.textContent).toEqual('-');
  });
});
