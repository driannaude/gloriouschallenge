import { Module } from '@nestjs/common';
import { CennzNetService } from './cennznet.service';

@Module({
  providers: [CennzNetService],
  exports: [CennzNetService],
})
export class CennzNetModule {}
