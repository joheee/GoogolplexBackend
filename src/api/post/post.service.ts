import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createPostDto: CreatePostDto) {
    return await this.prisma.post.create({
      data: {
        article_id: createPostDto.article_id,
        assignment_id: createPostDto.assignment_id,
        class_id: createPostDto.class_id,
      },
      include: {
        article: true,
        assignment: true,
        class: {
          include: {
            user_class_member: true,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.post.findMany({
      include: {
        article: true,
        assignment: true,
        class: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.post.findFirst({
      where: { id },
      include: {
        article: true,
        assignment: true,
        class: true,
      },
    });
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return await this.prisma.post.update({
      where: { id },
      data: updatePostDto,
      include: {
        article: true,
        assignment: true,
        class: true,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.post.delete({
      where: { id },
      include: {
        article: true,
        assignment: true,
        class: true,
      },
    });
  }
}
