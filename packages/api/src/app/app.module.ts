import { Module } from '@nestjs/common';
import { AddressModule } from '../address/address.module';
import { CennzNetModule } from '../cennznet/cennznet.module';
import { ChainModule } from '../chain/chain.module';

@Module({
  imports: [CennzNetModule, ChainModule, AddressModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
