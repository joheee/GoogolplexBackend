import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { NotificationModule } from './api/notification/notification.module';
import { ClassModule } from './api/class/class.module';

@Module({
  imports: [AuthModule, NotificationModule, ClassModule],
})
export class AppModule {}
