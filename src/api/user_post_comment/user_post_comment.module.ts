import { Module } from '@nestjs/common';
import { UserPostCommentService } from './user_post_comment.service';
import { UserPostCommentController } from './user_post_comment.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from '../auth/auth.service';
import { PostService } from '../post/post.service';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

@Module({
  imports: [PrismaModule],
  controllers: [UserPostCommentController],
  providers: [UserPostCommentService, AuthService, PostService, JwtStrategy],
})
export class UserPostCommentModule {}
