import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { unlinkSync } from 'fs';

@Injectable()
export class AssignmentFileService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    assignment_id: string,
    assignment_file_upload: Express.Multer.File,
  ) {
    console.log(assignment_id);
    return await this.prisma.assignmentFile.create({
      data: {
        assignment_id,
        ...assignment_file_upload,
      },
    });
  }

  async findAll() {
    return await this.prisma.assignmentFile.findMany({
      include: {
        assignment: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.assignmentFile.findFirst({
      where: { id },
      include: {
        assignment: true,
      },
    });
  }

  async findByAssignmentId(assignment_id: string) {
    return await this.prisma.assignmentFile.findFirst({
      where: {
        assignment_id,
      },
    });
  }

  async removeInPublic(filePath: string) {
    unlinkSync(filePath);
    return true;
  }

  async removeInDb(id: string) {
    return await this.prisma.assignmentFile.delete({
      where: { id },
    });
  }
}
