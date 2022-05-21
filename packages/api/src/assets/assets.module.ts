import { Module } from '@nestjs/common';
import { AssetsGateway } from './assets.gateway';
import { CennzNetModule } from '../cennznet/cennznet.module';
import { AssetsService } from './assets.service';

@Module({
  imports: [CennzNetModule],
  providers: [AssetsService, AssetsGateway],
})
export class AssetsModule {}
