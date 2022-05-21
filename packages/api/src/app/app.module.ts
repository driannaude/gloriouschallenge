import { Module } from '@nestjs/common';
import { WalletModule } from '../wallet/wallet.module';
import { AssetsModule } from '../assets/assets.module';
import { CennzNetModule } from '../cennznet/cennznet.module';
import { ChainModule } from '../chain/chain.module';

@Module({
  imports: [CennzNetModule, ChainModule, WalletModule, AssetsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
