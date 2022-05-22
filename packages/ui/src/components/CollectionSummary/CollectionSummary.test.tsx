import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { CollectionSummary } from './CollectionSummary';
import { act } from 'react-dom/test-utils';

const TEST_PAYLOAD = {
  collectionId: 65,
  name: 'TEST',
  owner: '5F4bqAuskqbRULcnD72songmAj9Rk2iWuE6QDeWTfiU3caR9',
  tokens: [
    {
      path: [0, 0, 0],
      owner: '5ERPvZ1DvrKz6zCJuhua8BvPZrsvRNq56mzhZqEwjRNfpjKR',
    },
  ],
};

jest.mock('@glorious-challenge/websockets', () => {
  const websockets = {
    ws: {
      connect: jest.fn(),
      on: jest.fn((event, handler) => {
        switch (event) {
          case 'connect':
          case 'disconnect':
            return handler();
          case 'asset:update':
            return handler(TEST_PAYLOAD);
          default:
            return handler();
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

describe('Collection summary status tests', () => {
  let history, route, component;
  beforeEach(() => {
    history = createMemoryHistory();
    route = '/';
    history.push(route);
    component = render(
      <Router location={history.location} navigator={history}>
        <CollectionSummary id={TEST_PAYLOAD.collectionId} />
      </Router>
    );
  });
  test('it renders the component', () => {
    expect(component).toBeTruthy();
  });
  test('it renders the collection id', async () => {
    const id = component.getByTestId('collection-id');
    expect(id.textContent).toEqual(TEST_PAYLOAD.collectionId.toString());
  });
  test('it renders the collection name', async () => {
    const id = component.getByTestId('collection-name');
    expect(id.textContent).toEqual(TEST_PAYLOAD.name);
  });
  test('it navigates to the asset page when collection owner button is clicked', async () => {
    const btn = component.getByTestId('collection-owner-link');
    await act(async () => {
      fireEvent.click(btn);
    });
    expect(history.location.pathname).toBe(`/${TEST_PAYLOAD.owner}`);
  });
  test('it navigates to the asset page when asset owner button is clicked', async () => {
    const btn = component.getByTestId(
      `${TEST_PAYLOAD.tokens[0].path.join('-')}-link`
    );
    await act(async () => {
      fireEvent.click(btn);
    });
    expect(history.location.pathname).toBe(`/${TEST_PAYLOAD.tokens[0].owner}`);
  });
  test('it renders all items in the collection', () => {
    TEST_PAYLOAD.tokens.forEach((token) => {
      const key = `token-${token.path.join('-')}`;
      const tokenCard = component.getByTestId(key);
      expect(tokenCard).toBeTruthy();
    });
  });
});
