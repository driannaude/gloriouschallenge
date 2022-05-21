import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CennzNetModule } from '../cennznet/cennznet.module';
import { WalletGateway } from './wallet.gateway';

@Module({
  imports: [CennzNetModule],
  providers: [WalletService, WalletGateway],
})
export class WalletModule {}
