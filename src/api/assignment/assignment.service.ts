import { Injectable } from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AssignmentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAssignmentDto: CreateAssignmentDto) {
    return await this.prisma.assignment.create({
      data: createAssignmentDto,
    });
  }

  async findAll() {
    return await this.prisma.assignment.findMany({
      include: {
        user_assignment_todo: {
          include: {
            user: true,
          },
        },
        post: true,
        assignment_file: true,
      },
    });
  }

  async findByClassId(class_id: string) {
    return await this.prisma.assignment.findMany({
      where: {
        post: {
          class_id,
        },
      },
      include: {
        user_assignment_todo: {
          include: {
            user: true,
          },
        },
        post: true,
        assignment_file: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.assignment.findFirst({
      where: { id },
      include: {
        user_assignment_todo: {
          include: {
            user: true,
          },
        },
        post: true,
        assignment_file: true,
      },
    });
  }

  async update(id: string, updateAssignmentDto: UpdateAssignmentDto) {
    return await this.prisma.assignment.update({
      where: { id },
      data: updateAssignmentDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.assignment.delete({
      where: { id },
    });
  }
}
