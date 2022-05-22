import { Test, TestingModule } from '@nestjs/testing';
import { CennzNetModule } from '../cennznet/cennznet.module';
import { ChainGateway } from './chain.gateway';

describe('ChainGateway', () => {
  let gateway: ChainGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CennzNetModule],
      providers: [ChainGateway],
    }).compile();
    gateway = module.get<ChainGateway>(ChainGateway);
  });

  describe('Initialization checks', () => {
    it('should be defined', () => {
      expect(gateway).toBeDefined();
    });
  });
});
