import io from 'socket.io-client';

const WS_URL = 'http://localhost:8080';

export const ws = io(WS_URL);
