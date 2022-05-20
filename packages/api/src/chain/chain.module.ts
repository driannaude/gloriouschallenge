import { Module } from '@nestjs/common';
import { CennzNetModule } from '../cennznet/cennznet.module';
import { ChainGateway } from './chain.gateway';

@Module({
  imports: [CennzNetModule],
  providers: [ChainGateway],
})
export class ChainModule {}
