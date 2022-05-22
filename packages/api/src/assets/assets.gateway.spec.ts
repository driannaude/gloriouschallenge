import { Test, TestingModule } from '@nestjs/testing';
import { CennzNetModule } from '../cennznet/cennznet.module';
import { AssetsGateway } from './assets.gateway';
import { AssetsService } from './assets.service';

describe('AssetsGateway', () => {
  let gateway: AssetsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CennzNetModule],
      providers: [AssetsService, AssetsGateway],
    }).compile();

    gateway = module.get<AssetsGateway>(AssetsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
