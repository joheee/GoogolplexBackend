import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { NotificationModule } from './api/notification/notification.module';
import { ClassModule } from './api/class/class.module';
import { UserClassMemberModule } from './api/user_class_member/user_class_member.module';
import { ArticleModule } from './api/article/article.module';
import { AssignmentModule } from './api/assignment/assignment.module';

@Module({
  imports: [AuthModule, NotificationModule, ClassModule, UserClassMemberModule, ArticleModule, AssignmentModule],
})
export class AppModule {}
