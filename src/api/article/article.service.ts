import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createArticleDto: CreateArticleDto) {
    return await this.prisma.article.create({
      data: createArticleDto,
      include: {
        post: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.article.findMany({
      include: {
        post: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.article.findFirst({
      where: { id },
      include: {
        post: true,
      },
    });
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    return await this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
      include: {
        post: true,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.article.delete({
      where: { id },
      include: {
        post: true,
      },
    });
  }
}
