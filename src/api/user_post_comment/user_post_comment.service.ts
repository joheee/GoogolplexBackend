import { Injectable } from '@nestjs/common';
import { CreateUserPostCommentDto } from './dto/create-user_post_comment.dto';
import { UpdateUserPostCommentDto } from './dto/update-user_post_comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserPostCommentService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserPostCommentDto: CreateUserPostCommentDto) {
    return await this.prisma.userPostComment.create({
      data: createUserPostCommentDto,
      include: {
        post: true,
        user: {
          include: {
            user_class_member: true,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.userPostComment.findMany({
      include: {
        post: true,
        user: {
          include: {
            user_class_member: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.userPostComment.findFirst({
      where: { id },
      include: {
        post: true,
        user: {
          include: {
            user_class_member: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async findByPostId(post_id: string) {
    return await this.prisma.userPostComment.findMany({
      where: {
        post_id,
      },
      include: {
        post: true,
        user: {
          include: {
            user_class_member: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async update(id: string, updateUserPostCommentDto: UpdateUserPostCommentDto) {
    return await this.prisma.userPostComment.update({
      where: { id },
      data: updateUserPostCommentDto,
      include: {
        post: true,
        user: {
          include: {
            user_class_member: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.userPostComment.delete({
      where: { id },
      include: {
        post: true,
        user: {
          include: {
            user_class_member: true,
          },
        },
      },
    });
  }
}
