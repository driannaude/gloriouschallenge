import { UnsubscribePromise } from '@cennznet/api/types';
import { Logger, OnApplicationBootstrap } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
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
    this.cennzNetService.api().rpc.chain.subscribeAllHeads((header) => {
      this.server.emit('block_number:update', header.number);
    });
    // this.cennzNetService.api().query.system.events((events) => {
    //   this.logger.debug(`Received ${events.length} events`);
    //   // Loop through the Vec<EventRecord>
    //   events.forEach((record) => {
    //     // Extract the phase, event and the event types
    //     const { event, phase } = record;
    //     const types = event.typeDef;
    //     this.logger.debug(`Section ${event.section}`);
    //     this.logger.debug(`Method ${event.method}`);
    //     if (event.section == `genericAssets` && event.method == `Transferred`) {
    //       // do something with event.data here
    //       console.log(event);
    //     }
    //     if (
    //       event.section === 'baseFee' &&
    //       event.method === 'NewBaseFeePerGas'
    //     ) {
    //       event.data.forEach((data, index) => {
    //         this.logger.log(`${types[index].type}: ${data.toNumber()}`);
    //       });
    //     }
    //   });
    // });
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

  @SubscribeMessage('balance:request')
  handleMessage(client: Socket, payload: { address: string }) {
    const network = 1;
    const { address } = payload;
    this.logger.debug(
      `Client ${client.id} subscribing to balance on ${network}...`
    );
    const unsubscribe = this.cennzNetService
      .api()
      .combineLatest(
        [
          this.cennzNetService.api().rpc.chain.subscribeNewHeads,
          (callback) =>
            this.cennzNetService
              .api()
              .query.genericAsset.freeBalance(network, address, callback),
        ],
        ([head, balance]) => {
          if (!client.connected && unsubscribe) {
            (unsubscribe as any)();
          }

          this.logger.log(`#${head.number}: ${client.id} has ${balance} units`);

          client.emit('balance:update', {
            balance: Number(balance),
          });
        }
      );
  }
}
