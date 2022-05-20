import { ws } from '@glorious-challenge/websockets';
import { useEffect, useState } from 'react';

interface UseWebsocketsConfig {
  onConnect?: () => void;
  onDisconnect?: () => void;
}

interface UseWebsocketsHook<T> {
  isConnected: boolean;
  data: T | null;
  emit: <WebsocketRequestType>(
    event: string,
    message: WebsocketRequestType
  ) => void;
}

export const useWebSockets = <WebSocketDataType>(
  event: string,
  config?: UseWebsocketsConfig
): UseWebsocketsHook<WebSocketDataType> => {
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState<WebSocketDataType | null>(null);
  useEffect(() => {
    console.log('bootstrapping useWebSockets');
    ws.on('connect', () => {
      setIsConnected(true);
      config?.onConnect?.();
    });
    ws.on('disconnect', () => {
      setIsConnected(false);
      config?.onDisconnect?.();
    });
    ws.on(event, (response) => {
      setData(response);
    });
  }, []);

  const emit = <WebSocketRequestType>(
    event: string,
    message: WebSocketRequestType
  ) => {
    ws.emit(event, message);
  };

  return {
    isConnected,
    data,
    emit,
  };
};
