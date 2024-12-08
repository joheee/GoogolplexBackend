import { Injectable } from '@nestjs/common';
import { CreateAssignmentFileDto } from './dto/create-assignment_file.dto';
import { UpdateAssignmentFileDto } from './dto/update-assignment_file.dto';

@Injectable()
export class AssignmentFileService {
  create(createAssignmentFileDto: CreateAssignmentFileDto) {
    return 'This action adds a new assignmentFile';
  }

  findAll() {
    return `This action returns all assignmentFile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} assignmentFile`;
  }

  update(id: number, updateAssignmentFileDto: UpdateAssignmentFileDto) {
    return `This action updates a #${id} assignmentFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} assignmentFile`;
  }
}
