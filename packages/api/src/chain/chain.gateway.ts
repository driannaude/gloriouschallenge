import { OnApplicationBootstrap } from '@nestjs/common';
import { WebSocketGateway } from '@nestjs/websockets';
import { CennzNetService } from '../cennznet/cennznet.service';
import { SubscribableGateway } from '../utils/subscribable.gateway';

@WebSocketGateway(8080, { cors: true })
export class ChainGateway
  extends SubscribableGateway
  implements OnApplicationBootstrap
{
  constructor(private readonly cennzNetService: CennzNetService) {
    super(ChainGateway.name);
  }

  onApplicationBootstrap() {
    this.cennzNetService.api().rpc.chain.subscribeNewHeads((header) => {
      this.server.emit('chain:update', {
        block_number: header.number,
      });
    });
  }
}
