import { Module } from '@nestjs/common';
import { CennzNetModule } from '../cennznet/cennznet.module';
import { WalletGateway } from './wallet.gateway';

@Module({
  imports: [CennzNetModule],
  providers: [WalletGateway],
})
export class WalletModule {}
