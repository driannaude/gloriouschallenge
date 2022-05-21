import { Module } from '@nestjs/common';
import { AssetsGateway } from './assets.gateway';
import { CennzNetModule } from '../cennznet/cennznet.module';
import { AssetsController } from './assets.controller';
import { AssetsService } from './assets.service';

@Module({
  imports: [CennzNetModule],
  controllers: [AssetsController],
  providers: [AssetsService, AssetsGateway],
})
export class AssetsModule {}
