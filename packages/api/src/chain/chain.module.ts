import { Module } from '@nestjs/common';
import { ChainGateway } from './chain.gateway';

@Module({
  providers: [ChainGateway],
})
export class ChainModule {}
