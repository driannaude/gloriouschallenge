import { Injectable, Logger } from '@nestjs/common';
import { Api } from '@cennznet/api';

@Injectable()
export class CennzNetService {
  private _api: Api;
  // Logger instance
  private logger = new Logger(CennzNetService.name);
  // Set to true if CENNZ API is ready
  public isReady = false;

  async onModuleInit() {
    // Init api after module dependencies initialize
    this._api = await Api.create({
      provider: 'wss://cennznet.unfrastructure.io/public/ws',
    });
    this._api.isReadyOrError
      .then(() => {
        this.isReady = true;
        this.logger.debug('CENNZ API Ready');
      })
      .catch((err) => {
        this.logger.error(err);
      });
  }

  public api() {
    return this._api;
  }
}
