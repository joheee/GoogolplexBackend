import { Module } from '@nestjs/common';
import { AssignmentFileService } from './assignment_file.service';
import { AssignmentFileController } from './assignment_file.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AssignmentService } from '../assignment/assignment.service';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

@Module({
  imports: [PrismaModule],
  controllers: [AssignmentFileController],
  providers: [AssignmentFileService, AssignmentService, JwtStrategy],
})
export class AssignmentFileModule {}
