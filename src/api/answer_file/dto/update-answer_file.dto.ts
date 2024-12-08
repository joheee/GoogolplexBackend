import { PartialType } from '@nestjs/swagger';
import { CreateAnswerFileDto } from './create-answer_file.dto';

export class UpdateAnswerFileDto extends PartialType(CreateAnswerFileDto) {}
