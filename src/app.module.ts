import { ContactModule } from './contact/contact.module';
import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ContactModule, CommonModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
