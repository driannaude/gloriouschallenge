import { Module } from '@nestjs/common';
import { CennzNetService } from './cennznet.service';

@Module({
  providers: [CennzNetService],
})
export class CennzNetModule {}
