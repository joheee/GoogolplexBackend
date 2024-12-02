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
    return await this.prisma.assignment.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.assignment.findFirst({
      where: { id },
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
