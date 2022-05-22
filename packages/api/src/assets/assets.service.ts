import { Injectable, Logger } from '@nestjs/common';
import { CennzNetService } from '../cennznet/cennznet.service';
import {
  INftCollectionSummary,
  INftToken,
} from '@glorious-challenge/api-interface';

@Injectable()
export class AssetsService {
  private logger: Logger = new Logger(AssetsService.name);

  constructor(private readonly cennzNetService: CennzNetService) {}

  async getCollectionName(id: string): Promise<string> {
    const name = await this.cennzNetService.api().query.nft.collectionName(id);
    return name.toHuman().toString();
  }

  async getCollectionOwner(id: string): Promise<string> {
    const owner = await this.cennzNetService
      .api()
      .query.nft.collectionOwner(id);
    return owner.toHuman().toString();
  }

  async getCollectionTokens(id: string): Promise<INftToken[]> {
    const tokenInfo = await this.cennzNetService
      .api()
      .derive.nft.tokenInfoForCollection(id);

    const tokens: INftToken[] = tokenInfo.map((token) => {
      const { tokenId, owner } = token;
      const { seriesId, serialNumber } = tokenId;
      return {
        path: [Number(id), Number(seriesId), Number(serialNumber)],
        owner: owner,
      };
    });
    return tokens;
  }

  async getCollectionSummary(id: string): Promise<INftCollectionSummary> {
    const name = await this.getCollectionName(id);
    const owner = await this.getCollectionOwner(id);
    const tokens = await this.getCollectionTokens(id);
    const response: INftCollectionSummary = {
      collectionId: Number(id),
      name,
      owner,
      tokens,
    };

    // 2. For each item in collection, fetch total issuance
    return response;
  }
}
