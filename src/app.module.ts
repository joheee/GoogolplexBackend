import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { NotificationModule } from './api/notification/notification.module';
import { ClassModule } from './api/class/class.module';
import { UserClassMemberModule } from './api/user_class_member/user_class_member.module';
import { ArticleModule } from './api/article/article.module';
import { AssignmentModule } from './api/assignment/assignment.module';
import { UserPostCommentModule } from './api/user_post_comment/user_post_comment.module';
import { PostModule } from './api/post/post.module';

@Module({
  imports: [
    AuthModule,
    NotificationModule,
    ClassModule,
    UserClassMemberModule,
    ArticleModule,
    AssignmentModule,
    PostModule,
    UserPostCommentModule,
  ],
})

export class AppModule {}