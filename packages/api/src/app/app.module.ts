import { Module } from '@nestjs/common';
import { CennzNetModule } from '../cennznet/cennznet.module';
import { ChainModule } from '../chain/chain.module';

@Module({
  imports: [CennzNetModule, ChainModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
