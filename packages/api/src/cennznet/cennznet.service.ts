import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Api } from '@cennznet/api';
import { IfReady } from './cennznet.decorators';

@Injectable()
export class CennzNetService {
  public isReady = false;

  private api: Api;
  private blockNumber: number;
  // Logger instance
  private logger = new Logger(CennzNetService.name);
  // Set to true if CENNZ API is ready

  async onModuleInit() {
    // Init api after module dependencies initialize
    this.api = await Api.create({
      provider: 'wss://cennznet.unfrastructure.io/public/ws',
    });
    this.api.isReadyOrError
      .then(() => {
        this.isReady = true;
        this.logger.debug('CENNZ API Ready');
      })
      .catch((err) => {
        this.logger.error(err);
      });
  }

  @IfReady()
  async getCurrentBlockNumber(): Promise<number> {
    const header = await this.api.rpc.chain.getHeader();
    return header.number.toNumber();
  }
  @IfReady()
  async getNftCollection(id: number) {
    try {
      const collectionSummary = await this.api.rpc.nft.getCollectionInfo(id);
      return {
        summary: collectionSummary.isEmpty ? null : collectionSummary.toHuman(),
      };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error.message);
    }
  }
}
