import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { FileUploadDto } from './dto/file-upload.dto';
import * as AdmZip from 'adm-zip';
import * as sharp from 'sharp';

@Injectable()
export class FilesService {
  async avatar(file: any) {
    try {
      const fileName = uuidv4() + '.jpg';
      const avatarPath = path.join(__dirname, '..', 'static', 'avatar');

      if (!fs.existsSync(avatarPath)) {
        fs.mkdirSync(avatarPath, { recursive: true });
      }

      await sharp(file.buffer)
        .resize(200)
        .jpeg({ quality: 80 })
        .flatten({ background: '#FFF' })
        .toFile(path.join(avatarPath, fileName));

      const link = `http://${process.env.HOST}:${process.env.PORT}/avatar/${fileName}`;
      return { link };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async upload(fileUploadDto: FileUploadDto, file: any) {
    try {
      let { userId, shopId, isManagerFile } = fileUploadDto;
      isManagerFile = String(isManagerFile) === 'true';

      const fileExtension = file.originalname.split('.').pop();
      const fileName = uuidv4() + '.' + fileExtension;
      const managerFolder = 'manager';
      const uploadFolder = 'upload';

      let folder = uploadFolder;
      if (isManagerFile) {
        folder = managerFolder;
      }
      const filePath = path.join(__dirname, '..', 'static', folder);

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.join(filePath, fileName), file.buffer);

      const link = `http://${process.env.HOST}:${process.env.PORT}/${folder}/${fileName}`;
      return { link };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async uploads(fileUploadDto: FileUploadDto, files: any[]) {
    try {
      const { userId, shopId } = fileUploadDto;

      const zipFileName = uuidv4() + '.zip';
      const uploadsPath = path.join(__dirname, '..', 'static', 'uploads');

      if (!fs.existsSync(uploadsPath)) {
        fs.mkdirSync(uploadsPath, { recursive: true });
      }

      const zip = new AdmZip();
      files.forEach((file: any) => {
        const fileExtension = file.originalname.split('.').pop();
        const fileName = uuidv4() + '.' + fileExtension;
        zip.addFile(fileName, file.buffer);
      });
      zip.writeZip(path.join(uploadsPath, zipFileName));

      const link = `http://${process.env.HOST}:${process.env.PORT}/uploads/${zipFileName}`;
      return { link };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
