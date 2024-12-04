import { Module } from '@nestjs/common';
import { UserTodoAnswerService } from './user_todo_answer.service';
import { UserTodoAnswerController } from './user_todo_answer.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserAssignmentTodoService } from '../user_assignment_todo/user_assignment_todo.service';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

@Module({
  imports: [PrismaModule],
  controllers: [UserTodoAnswerController],
  providers: [UserTodoAnswerService, UserAssignmentTodoService, JwtStrategy],
})
export class UserTodoAnswerModule {}
