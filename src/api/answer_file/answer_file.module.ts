import { Module } from '@nestjs/common';
import { AnswerFileService } from './answer_file.service';
import { AnswerFileController } from './answer_file.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserTodoAnswerService } from '../user_todo_answer/user_todo_answer.service';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

@Module({
  imports: [PrismaModule],
  controllers: [AnswerFileController],
  providers: [AnswerFileService, UserTodoAnswerService, JwtStrategy],
})
export class AnswerFileModule {}
