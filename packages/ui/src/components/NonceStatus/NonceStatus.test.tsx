import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { NonceStatus } from './NonceStatus';
import { ws } from '@glorious-challenge/websockets';

const TEST_ADDRESS = '5F4bqAuskqbRULcnD72songmAj9Rk2iWuE6QDeWTfiU3caR9';

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
            return handler({ nonce: 123, balance: 123 });
        }
      }),
      emit: jest.fn((event, handler) => handler()),
    },
  };
});

describe('Nonce status tests', () => {
  test('it renders the component', () => {
    const component = render(<NonceStatus address={TEST_ADDRESS} />);
    const nonce = component.getByTestId('nonce');
    expect(nonce).toBeTruthy();
  });
  test('it renders a value when an adress has passed', async () => {
    const component = render(<NonceStatus address={TEST_ADDRESS} />);
    const nonce = component.getByTestId('nonce');
    expect(nonce.textContent).toEqual('123');
  });

  test('it does not render a value if address is empty', async () => {
    const component = render(<NonceStatus />);
    const nonce = component.getByTestId('nonce');
    expect(nonce.textContent).toEqual('-');
  });
});
