import { Module } from '@nestjs/common';
import { CennzNetModule } from '../cennznet/cennznet.module';
import { ChainModule } from '../chain/chain.module';

@Module({
  imports: [ChainModule, CennzNetModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
