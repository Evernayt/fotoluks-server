import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { rm, readdir, rmdir } from 'fs/promises';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { FileUploadDto } from './dto/file-upload.dto';
import * as AdmZip from 'adm-zip';
import * as sharp from 'sharp';
import { IFile } from './models/IFile';
import { InjectModel } from '@nestjs/sequelize';
import { OrderFile } from 'src/order-files/order-files.model';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Op, WhereOptions } from 'sequelize';
import createDate from 'src/common/helpers/createDate';
import { MAX_FILE_STORAGE_DAYS } from 'src/common/constants/app';

const getDirectories = async (source: string) =>
  (await readdir(source, { withFileTypes: true }))
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const cleanEmptyFolders = async () => {
  try {
    const staticPath = path.join(__dirname, '../..', 'static');
    const orderFolderPath = path.join(staticPath, 'orders');
    const orderFolderNames = await getDirectories(orderFolderPath);
    for (const orderFolderName of orderFolderNames) {
      const folderPath = path.join(orderFolderPath, orderFolderName);
      const files = await readdir(folderPath);
      if (files.length <= 0) {
        rmdir(folderPath);
      }
    }
  } catch (error) {}
};

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(OrderFile) private orderFileModel: typeof OrderFile,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async handleCron() {
    const orderFiles = await this.orderFileModel.findAll({
      where: {
        createdAt: {
          [Op.lte]: createDate(-MAX_FILE_STORAGE_DAYS).toISOString(),
        },
      },
    });
    const orderFilesForDelete = orderFiles.map((orderFile) => orderFile.id);
    if (orderFilesForDelete.length > 0) {
      const DOMAIN_LINK = `http://${process.env.HOST}:${process.env.PORT}`;
      const staticPath = path.join(__dirname, '../..', 'static');
      for (const orderFile of orderFiles) {
        const filePath = orderFile.link.replace(DOMAIN_LINK, '');
        const fullFilePath = path.join(staticPath, filePath);
        rm(fullFilePath, { force: true });
      }

      const whereOrderFile: WhereOptions<OrderFile> = {
        id: orderFilesForDelete,
      };
      this.orderFileModel.destroy({ where: whereOrderFile });

      cleanEmptyFolders();
    }
  }

  async uploadAvatar(file: IFile) {
    try {
      const fileName = `${uuidv4()}.jpg`;
      const avatarsPath = path.join(__dirname, '../..', 'static', 'avatar');

      await sharp(file.buffer)
        .resize(200)
        .jpeg({ quality: 80 })
        .flatten({ background: '#FFF' })
        .toFile(path.join(avatarsPath, fileName));

      const DOMAIN_LINK = `http://${process.env.HOST}:${process.env.PORT}`;
      const link = `${DOMAIN_LINK}/avatar/${fileName}`;
      return { link };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async uploadManagerFile(file: IFile) {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = `${uuidv4()}.${fileExtension}`;
      const managerFilesPath = path.join(
        __dirname,
        '../..',
        'static',
        'manager',
      );

      await sharp(file.buffer)
        .resize(200)
        .jpeg({ quality: 80 })
        .flatten({ background: '#FFF' })
        .toFile(path.join(managerFilesPath, fileName));

      const DOMAIN_LINK = `http://${process.env.HOST}:${process.env.PORT}`;
      const link = `${DOMAIN_LINK}/manager/${fileName}`;
      return { link };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async upload(fileUploadDto: FileUploadDto, file: IFile) {
    try {
      let { userId, shopId } = fileUploadDto;

      const fileExtension = file.originalname.split('.').pop();
      const fileName = uuidv4() + '.' + fileExtension;
      const filePath = path.join(__dirname, '../..', 'static', 'upload');

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.join(filePath, fileName), file.buffer);

      const DOMAIN_LINK = `http://${process.env.HOST}:${process.env.PORT}`;
      const link = `${DOMAIN_LINK}/upload/${fileName}`;
      return { link };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async uploads(fileUploadDto: FileUploadDto, files: IFile[]) {
    try {
      const { userId, shopId } = fileUploadDto;

      const zipFileName = uuidv4() + '.zip';
      const uploadsPath = path.join(__dirname, '../..', 'static', 'uploads');

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

      const DOMAIN_LINK = `http://${process.env.HOST}:${process.env.PORT}`;
      const link = `${DOMAIN_LINK}/uploads/${zipFileName}`;
      return { link };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
