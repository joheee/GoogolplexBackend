import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ArticleService } from '../article/article.service';
import { AssignmentService } from '../assignment/assignment.service';
import { ClassService } from '../class/class.service';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { UserClassMemberService } from '../user_class_member/user_class_member.service';
import { UserAssignmentTodoService } from '../user_assignment_todo/user_assignment_todo.service';

@Module({
  imports: [PrismaModule],
  controllers: [PostController],
  providers: [
    PostService,
    ArticleService,
    AssignmentService,
    ClassService,
    UserClassMemberService,
    UserAssignmentTodoService,
    JwtStrategy,
  ],
})
export class PostModule {}
