import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';

@Module({
  imports: [UserModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
