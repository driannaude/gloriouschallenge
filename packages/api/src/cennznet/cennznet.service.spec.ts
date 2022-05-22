import { Test, TestingModule } from '@nestjs/testing';
import { CennzNetService } from './cennznet.service';

describe('CennznetService', () => {
  let service: CennzNetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CennzNetService],
    }).compile();

    service = module.get<CennzNetService>(CennzNetService);
    await service.onModuleInit();
  });

  describe('Initialization check', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
    it('should return the CENNZNet Api module after onModuleInit', async () => {
      const api = service.api();
      expect(api).toBeDefined();
    });
  });

  describe('@cennznet/api connection', () => {
    it('should connect to the @cennznet/api on boot', async () => {
      const isConnected = service.api().isConnected;
      expect(isConnected).toBe(true);
    });
  });
});
