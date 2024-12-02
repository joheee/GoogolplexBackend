import { Module } from '@nestjs/common';
import { UserClassMemberService } from './user_class_member.service';
import { UserClassMemberController } from './user_class_member.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { AuthService } from '../auth/auth.service';
import { ClassService } from '../class/class.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserClassMemberController],
  providers: [UserClassMemberService, AuthService, ClassService, JwtStrategy],
})
export class UserClassMemberModule {}
