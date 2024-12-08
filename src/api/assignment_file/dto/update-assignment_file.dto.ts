import { PartialType } from '@nestjs/swagger';
import { CreateAssignmentFileDto } from './create-assignment_file.dto';

export class UpdateAssignmentFileDto extends PartialType(CreateAssignmentFileDto) {}
