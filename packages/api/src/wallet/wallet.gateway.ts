import { UnsubscribePromise } from '@cennznet/api/types';
import {
  IWalletAccount,
  IWalletRequest,
} from '@glorious-challenge/api-interface';
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
import { SubscribableGateway } from '../utils/subscribable.gateway';

@WebSocketGateway(8080, { cors: true })
export class WalletGateway extends SubscribableGateway {
  constructor(private readonly cennzNetService: CennzNetService) {
    super(WalletGateway.name);
  }

  @SubscribeMessage('wallet:request')
  async handleMessage(client: Socket, payload: IWalletRequest) {
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
          (callback) =>
            this.cennzNetService.api().query.system.account(address, callback),
        ],
        async ([head, balance, account]) => {
          if (!client.connected && unsubscribe) {
            (await unsubscribe)();
          }

          this.logger.log(`#${head.number}: ${client.id} has ${balance} units`);

          const message: IWalletAccount = {
            address,
            balance: Number(balance),
            nonce: Number(account.nonce),
          };

          client.emit('wallet:update', message);
        }
      );
    await this.subscribeClient(client.id, unsubscribe);
  }
}
