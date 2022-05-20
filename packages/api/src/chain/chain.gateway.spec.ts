import { Test, TestingModule } from '@nestjs/testing';
import { ChainGateway } from './chain.gateway';

describe('ChainGateway', () => {
  let gateway: ChainGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChainGateway],
    }).compile();

    gateway = module.get<ChainGateway>(ChainGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
