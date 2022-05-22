import * as io from 'socket.io-client';

const WS_URL = process.env.NODE_ENV === 'test' ? '' : 'http://localhost:8080';

export const ws = io.connect(WS_URL);
