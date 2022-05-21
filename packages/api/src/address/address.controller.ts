import { Controller, Get, Param } from '@nestjs/common';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
  @Get('/:network/:id')
  async getAddressInfo(
    @Param('network') network: number,
    @Param('id') id: string
  ) {
    return await this.addressService.getAddressInfo(network, id);
  }
}
