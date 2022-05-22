import { Test, TestingModule } from '@nestjs/testing';
import { CennzNetModule } from '../cennznet/cennznet.module';
import { WalletGateway } from './wallet.gateway';

describe('WalletGateway', () => {
  let gateway: WalletGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CennzNetModule],
      providers: [WalletGateway],
    }).compile();

    gateway = module.get<WalletGateway>(WalletGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
