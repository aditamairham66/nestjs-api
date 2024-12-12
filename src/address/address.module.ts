import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { Module } from '@nestjs/common';
import { ContactModule } from './../contact/contact.module';

@Module({
  imports: [ContactModule],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
