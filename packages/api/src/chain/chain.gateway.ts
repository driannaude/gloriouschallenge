import { Logger, OnApplicationBootstrap } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CennzNetService } from '../cennznet/cennznet.service';

@WebSocketGateway(8080, { cors: true })
export class ChainGateway
  implements
    OnGatewayInit,
    OnApplicationBootstrap,
    OnGatewayConnection,
    OnGatewayDisconnect
{
  private logger: Logger = new Logger(ChainGateway.name);
  private server: Server;
  constructor(private readonly cennzNetService: CennzNetService) {}

  onApplicationBootstrap() {
    this.cennzNetService.api().rpc.chain.subscribeNewHeads((header) => {
      this.server.emit('update:block_number', header.number);
    });
  }

  afterInit(server: Server) {
    this.logger.debug(`${ChainGateway.name} initialized on port 8080`);
    this.server = server;
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  //   @SubscribeMessage('message')
  //   handleMessage(client: Socket, payload: any): WsResponse<string> {
  //     this.logger.debug(`${client.id} says`, payload, typeof payload);
  //     return { event: 'message', data: 'hello' };
  //   }
}
