import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import * as path from 'path';

@Injectable()
export class AssignmentFileUpload {
  static storageOptions = diskStorage({
    destination: path.join(
      __dirname,
      '..',
      'googolplex',
      'public',
      'answer_file',
    ),
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
  });
}
