import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CennzNetService } from '../cennznet/cennznet.service';

const CENNZ_NETWORK = 1;

@Injectable()
export class AddressService {
  private logger: Logger = new Logger(AddressService.name);
  constructor(private readonly cennzNetService: CennzNetService) {}

  async getAddressInfo(network: number, address: string) {
    try {
      // Fetch MainNet Balance
      const reservedBalance = await this.cennzNetService
        .api()
        .query.genericAsset.reservedBalance(Number(network), address);
      const freeBalance = await this.cennzNetService
        .api()
        .query.genericAsset.freeBalance(Number(network), address);

      const account = await this.cennzNetService
        .api()
        .query.system.account(address);

      return {
        freeBalance: Number(freeBalance),
        reservedBalance: Number(reservedBalance),
        network,
        address,
        acount: account.toHuman(),
      };
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException(
        `Unable to look up address details for ${address}`
      );
    }
    return null;
  }
}
