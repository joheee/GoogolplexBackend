import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [PrismaModule, PassportModule],
  controllers: [NotificationController],
  providers: [NotificationService, AuthService],
})
export class NotificationModule {}
