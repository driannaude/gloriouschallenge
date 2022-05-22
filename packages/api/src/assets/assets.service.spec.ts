import { Test, TestingModule } from '@nestjs/testing';
import { AssetsGateway } from './assets.gateway';
import { AssetsService } from './assets.service';
import { CennzNetModule } from '../cennznet/cennznet.module';
describe('AssetsService', () => {
  let service: AssetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CennzNetModule],
      providers: [AssetsService, AssetsGateway],
    }).compile();

    service = module.get<AssetsService>(AssetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
