import { Test, TestingModule } from '@nestjs/testing';
import { CennzNetService } from './cennznet.service';

describe('CennznetService', () => {
  let service: CennzNetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CennzNetService],
    }).compile();

    service = module.get<CennzNetService>(CennzNetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
