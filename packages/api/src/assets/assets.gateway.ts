import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { CennzNetService } from '../cennznet/cennznet.service';

@WebSocketGateway(8080, { cors: true })
export class AssetsGateway {
  constructor(private readonly cennzNetService: CennzNetService) {}
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
