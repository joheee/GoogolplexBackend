import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { NotificationModule } from './api/notification/notification.module';

@Module({
  imports: [AuthModule, NotificationModule],
})
export class AppModule {}
