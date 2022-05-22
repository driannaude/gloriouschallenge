import { Test, TestingModule } from '@nestjs/testing';
import { AssetsGateway } from './assets.gateway';
import { AssetsService } from './assets.service';
import { CennzNetModule } from '../cennznet/cennznet.module';
import { CennzNetService } from '../cennznet/cennznet.service';

const TEST_COLLECTION_ID = '0';
const TEST_COLLECTION_OWNER =
  '5HbiMZ7PhU4oz6yQ6GhDZkRus1GjcsmA7fXEFaVDmHy6Rp5j';

describe('AssetsService', () => {
  let service: AssetsService;
  let cennzNetService: CennzNetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CennzNetModule],
      providers: [AssetsService, AssetsGateway],
    }).compile();
    cennzNetService = module.get<CennzNetService>(CennzNetService);
    await cennzNetService.onModuleInit();
    service = module.get<AssetsService>(AssetsService);
  });

  describe('Initialization checks', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('Unit tests', () => {
    it('should get a collection name', async () => {
      const collectionName = await service.getCollectionName(
        TEST_COLLECTION_ID
      );
      expect(collectionName).toBeDefined();
      expect(collectionName).toContain('CENNZnet');
    });

    it('should get the right collection owner', async () => {
      const collectionOwner = await service.getCollectionOwner(
        TEST_COLLECTION_ID
      );
      expect(collectionOwner).toBeDefined();
      expect(collectionOwner).toEqual(TEST_COLLECTION_OWNER);
    });

    it('should get at least one token in a collection', async () => {
      const collectionTokens = await service.getCollectionTokens(
        TEST_COLLECTION_ID
      );
      expect(collectionTokens).toBeDefined();
      expect(collectionTokens.length).toBeGreaterThan(0);
    });

    it('should get a collection summary', async () => {
      const collectionSummary = await service.getCollectionSummary(
        TEST_COLLECTION_ID
      );
      expect(collectionSummary).toBeDefined();
      expect(collectionSummary.name).toContain('CENNZnet');
      expect(collectionSummary.collectionId).toEqual(
        Number(TEST_COLLECTION_ID)
      );
      expect(collectionSummary.owner).toEqual(TEST_COLLECTION_OWNER);
      expect(collectionSummary.tokens.length).toBeGreaterThan(0);
    });
  });
});
