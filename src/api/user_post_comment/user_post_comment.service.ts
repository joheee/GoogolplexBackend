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
    });
  }

  async findAll() {
    return await this.prisma.userPostComment.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.userPostComment.findFirst({
      where: { id },
    });
  }

  async update(id: string, updateUserPostCommentDto: UpdateUserPostCommentDto) {
    return await this.prisma.userPostComment.update({
      where: { id },
      data: updateUserPostCommentDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.userPostComment.delete({
      where: { id },
    });
  }
}
