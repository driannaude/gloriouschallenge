import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { CennzNetModule } from '../cennznet/cennznet.module';

@Module({
  imports: [CennzNetModule],
  providers: [AddressService],
  controllers: [AddressController],
})
export class AddressModule {}
