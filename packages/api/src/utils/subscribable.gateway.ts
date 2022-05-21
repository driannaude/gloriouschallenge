import { UnsubscribePromise } from '@cennznet/api/types';
import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8080, { cors: true })
export class SubscribableGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  protected logger: Logger;
  protected server: Server;
  protected subscriptions: Record<string, UnsubscribePromise> = {};

  constructor(protected readonly name: string) {
    this.logger = new Logger(name);
  }

  protected async unsubscribeClient(id) {
    const unsubscribe = this.subscriptions[id];
    if (unsubscribe) {
      (await unsubscribe)();
    }
  }

  protected async subscribeClient(
    id: string,
    subscription: UnsubscribePromise
  ) {
    await this.unsubscribeClient(id);
    this.subscriptions[id] = subscription;
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  afterInit(server: Server) {
    this.logger.debug(`${this.name} initialized on port 8080`);
    this.server = server;
  }
}
