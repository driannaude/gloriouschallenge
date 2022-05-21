import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { CennzNetService } from '../cennznet/cennznet.service';
import { SubscribableGateway } from '../utils/subscribable.gateway';
import { AssetsService } from './assets.service';

@WebSocketGateway(8080, { cors: true })
export class AssetsGateway extends SubscribableGateway {
  constructor(
    private readonly cennzNetService: CennzNetService,
    private readonly assetService: AssetsService
  ) {
    super(AssetsGateway.name);
  }
  @SubscribeMessage('asset:request')
  async handleMessage(client: Socket, payload: { id: string }) {
    const unsubscribe = this.cennzNetService
      .api()
      .combineLatest(
        [this.cennzNetService.api().rpc.chain.subscribeNewHeads],
        async () => {
          if (!client.connected && unsubscribe) {
            (await unsubscribe)();
          }
          const summary = await this.assetService.getCollectionSummary(
            payload.id
          );

          client.emit('asset:update', summary);
        }
      );
    await this.subscribeClient(client.id, unsubscribe);
  }
}
