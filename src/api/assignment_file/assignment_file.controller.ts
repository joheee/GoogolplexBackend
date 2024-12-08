import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AssignmentFileService } from './assignment_file.service';
import { CreateAssignmentFileDto } from './dto/create-assignment_file.dto';
import { UpdateAssignmentFileDto } from './dto/update-assignment_file.dto';

@Controller('assignment-file')
export class AssignmentFileController {
  constructor(private readonly assignmentFileService: AssignmentFileService) {}

  @Post()
  create(@Body() createAssignmentFileDto: CreateAssignmentFileDto) {
    return this.assignmentFileService.create(createAssignmentFileDto);
  }

  @Get()
  findAll() {
    return this.assignmentFileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assignmentFileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssignmentFileDto: UpdateAssignmentFileDto) {
    return this.assignmentFileService.update(+id, updateAssignmentFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignmentFileService.remove(+id);
  }
}
