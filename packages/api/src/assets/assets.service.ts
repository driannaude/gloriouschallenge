import { SerialNumber, SeriesId } from '@cennznet/types';
import { Injectable, Logger } from '@nestjs/common';
import { CennzNetService } from '../cennznet/cennznet.service';

@Injectable()
export class AssetsService {
  private logger: Logger = new Logger(AssetsService.name);

  constructor(private readonly cennzNetService: CennzNetService) {}

  async getCollectionName(id: string) {
    const name = await this.cennzNetService.api().query.nft.collectionName(id);
    return name.toHuman();
  }

  async getCollectionRoyalties(id: string) {
    const royalties = await this.cennzNetService
      .api()
      .query.nft.collectionRoyalties(id);
    return royalties.toHuman();
  }

  async getCollectionOwner(id: string) {
    const owner = await this.cennzNetService
      .api()
      .query.nft.collectionOwner(id);
    return owner.toHuman();
  }

  async getCollectionTokens(id: string) {
    const tokenInfo = await this.cennzNetService
      .api()
      .derive.nft.tokenInfoForCollection(id);

    const tokens = tokenInfo.map((token) => {
      const { tokenId, owner } = token;
      const { seriesId, serialNumber } = tokenId;
      return {
        serialNumber: serialNumber.toHuman(),
        seriesId: seriesId.toHuman(),
        owner: owner.toString(),
      };
    });
    return tokens;
  }

  async getCollectionSummary(id: string) {
    const name = await this.getCollectionName(id);
    const royalties = await this.getCollectionRoyalties(id);
    const owner = await this.getCollectionOwner(id);
    const tokens = await this.getCollectionTokens(id);
    const response = {
      collectionId: id,
      name,
      owner,
      royalties,
      tokens,
    };

    // 2. For each item in collection, fetch total issuance
    return response;
  }
}
