import { Module } from '@nestjs/common';
import { UserAssignmentTodoService } from './user_assignment_todo.service';
import { UserAssignmentTodoController } from './user_assignment_todo.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from '../auth/auth.service';
import { AssignmentService } from '../assignment/assignment.service';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

@Module({
  imports: [PrismaModule],
  controllers: [UserAssignmentTodoController],
  providers: [
    UserAssignmentTodoService,
    AuthService,
    AssignmentService,
    JwtStrategy,
  ],
})
export class UserAssignmentTodoModule {}
