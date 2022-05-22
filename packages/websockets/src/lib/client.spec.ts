import { Socket } from 'socket.io-client';
import { ws } from './client';

describe('Lib: Websockets', () => {
  it('should export a Socket instance', () => {
    expect(ws).toBeDefined();
    expect(ws instanceof Socket).toBe(true);
  });
});
