import { Injectable } from '@nestjs/common';
import { CreateUserClassMemberDto } from './dto/create-user_class_member.dto';
import { UpdateUserClassMemberDto } from './dto/update-user_class_member.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserClassMemberService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserClassMemberDto: CreateUserClassMemberDto) {
    return await this.prisma.userClassMember.create({
      data: createUserClassMemberDto,
    });
  }

  async findAll() {
    return await this.prisma.userClassMember.findMany({
      include: {
        user: true,
      },
      orderBy: [
        {
          is_teacher: 'desc', // First order by is_teacher
        },
        {
          user: {
            name: 'asc', // Then order by user.name
          },
        },
      ],
    });
  }

  async findOne(id: string) {
    return await this.prisma.userClassMember.findFirst({
      where: { id },
      include: {
        user: true,
      },
      orderBy: [
        {
          is_teacher: 'desc', // First order by is_teacher
        },
        {
          user: {
            name: 'asc', // Then order by user.name
          },
        },
      ],
    });
  }

  async findManyByClassId(class_id: string) {
    return await this.prisma.userClassMember.findMany({
      where: {
        class_id,
      },
      include: {
        user: true,
      },
      orderBy: [
        {
          is_teacher: 'desc', // First order by is_teacher
        },
        {
          user: {
            name: 'asc', // Then order by user.name
          },
        },
      ],
    });
  }

  async findByUserAndClass(user_id: string, class_id: string) {
    return await this.prisma.userClassMember.findFirst({
      where: {
        user_id,
        class_id,
      },
      include: {
        user: true,
      },
      orderBy: [
        {
          is_teacher: 'desc', // First order by is_teacher
        },
        {
          user: {
            name: 'asc', // Then order by user.name
          },
        },
      ],
    });
  }

  async update(id: string, updateUserClassMemberDto: UpdateUserClassMemberDto) {
    return await this.prisma.userClassMember.update({
      where: { id },
      data: updateUserClassMemberDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.userClassMember.delete({
      where: { id },
    });
  }
}
