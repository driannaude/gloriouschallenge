import { Module } from '@nestjs/common';
import { AppGateway } from '../app.gateway';
import { CennzNetModule } from '../cennznet/cennznet.module';

@Module({
  imports: [CennzNetModule],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
