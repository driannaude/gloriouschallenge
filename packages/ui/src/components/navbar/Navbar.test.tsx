import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Navbar } from './Navbar';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { web3Accounts, web3Enable } from '@cennznet/extension-dapp';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';

jest.mock('@cennznet/extension-dapp', () => ({
  web3Accounts: jest.fn(async () => []),
  web3Enable: jest.fn(async () => []),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useLocation: jest.fn(),
}));

afterAll(() => {
  jest.clearAllMocks();
});

describe('Navbar tests', () => {
  let history, route, component;
  beforeEach(() => {
    history = createMemoryHistory();
    route = '/';
    history.push(route);
    component = render(
      <Router location={history.location} navigator={history}>
        <Navbar />
      </Router>
    );
  });
  test('it renders the logo', () => {
    const logo = component.getByTestId('logo');
    expect(logo).toBeTruthy();
  });
  test('it renders the menu', () => {
    const menu = component.getByTestId('menu');
    expect(menu).toBeTruthy();
  });

  test('it renders the hamburger', () => {
    const hamburger = component.getByTestId('hamburger');
    expect(hamburger).toBeTruthy();
  });

  test('it renders the wallet connect button', () => {
    const wallectConnectButton = component.getByTestId('wallet-connect-button');
    expect(wallectConnectButton).toBeTruthy();
  });

  test('it runs the connect logic when the wallet connect button is clicked', async () => {
    const wallectConnectButton = component.getByTestId('wallet-connect-button');
    await act(async () => {
      fireEvent.click(wallectConnectButton);
    });

    expect(web3Enable).toHaveBeenCalled();
  });
});
