import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { CreateCodeDto } from './dto/create-code.dto';
import { VerificationDto } from './dto/verification.dto';
import { VerificationCode } from './verification-codes.model';
import { VerificationTime } from './verification-times.model';
import { VerifiedPhone } from './verified-phones.model';
import {
  ATTEMPT_COUNT,
  ATTEMPT_INTERVAL_INCREMENT,
  ATTEMPT_INTERVAL_START,
} from 'src/common/constants/verification';

function calcNextTryTime(date: Date) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + 1);

  const currentDate = new Date();
  const duration = nextDate.getTime() - currentDate.getTime();
  const hours = Math.ceil((duration / 3600000) % 24) - 1;
  const minutes = Math.ceil((duration / 60000) % 60) - 1;

  return { nextDate, currentDate, hours, minutes };
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

@Injectable()
export class VerificationService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(VerifiedPhone)
    private verifiedPhoneModel: typeof VerifiedPhone,
    @InjectModel(VerificationTime)
    private verificationTimeModel: typeof VerificationTime,
    @InjectModel(VerificationCode)
    private verificationCodeModel: typeof VerificationCode,
  ) {}

  // DESKTOP, MOBILE
  async isVerified(phone: string) {
    const user = await this.userModel.findOne({
      where: { phone },
      attributes: {
        exclude: ['password'],
      },
    });

    const verifiedPhone = await this.verifiedPhoneModel.findOne({
      where: { phone },
    });

    if (verifiedPhone) {
      return { phoneVerified: true, user };
    } else {
      return { phoneVerified: false, user };
    }
  }

  // MOBILE
  async createCode(createCodeDto: CreateCodeDto) {
    const { phone, ip } = createCodeDto;

    const code = getRandomInt(1000, 9999);

    let verificationTime = await this.verificationTimeModel.findOne({
      where: { ip },
    });

    let attemptInterval: number;

    if (verificationTime) {
      attemptInterval = verificationTime.attemptInterval;

      if (verificationTime.attemptCount === 0) {
        const { nextDate, currentDate, hours, minutes } = calcNextTryTime(
          verificationTime.updatedAt,
        );

        if (nextDate >= currentDate) {
          throw new HttpException(
            `Число попыток израсходовано. Попоробуйте через ${hours}:${minutes}.`,
            HttpStatus.CONFLICT,
          );
        } else {
          await this.verificationTimeModel.update(
            {
              attemptInterval: ATTEMPT_INTERVAL_START,
              attemptCount: ATTEMPT_COUNT,
            },
            { where: { id: verificationTime.id } },
          );
          attemptInterval = ATTEMPT_INTERVAL_START;
        }
      } else {
        await this.verificationTimeModel.update(
          {
            attemptInterval:
              verificationTime.attemptInterval + ATTEMPT_INTERVAL_INCREMENT,
            attemptCount: verificationTime.attemptCount - 1,
          },
          { where: { id: verificationTime.id } },
        );
        attemptInterval =
          verificationTime.attemptInterval + ATTEMPT_INTERVAL_INCREMENT;
      }
    } else {
      verificationTime = await this.verificationTimeModel.create({
        ip,
        attemptInterval: ATTEMPT_INTERVAL_START,
        attemptCount: ATTEMPT_COUNT,
      });
      attemptInterval = ATTEMPT_INTERVAL_START;
    }

    await this.verificationCodeModel.create({
      phone,
      code,
    });

    return attemptInterval;
  }

  // MOBILE
  async checkCode(verificationDto: VerificationDto) {
    const { code, phone } = verificationDto;

    const verificationCode = await this.verificationCodeModel.findOne({
      where: { code, phone },
    });

    if (!verificationCode) {
      throw new HttpException('Неверный код!', HttpStatus.BAD_REQUEST);
    }

    return { correct: true };
  }

  // MOBILE
  async verifyPhone(verificationDto: VerificationDto) {
    const { code, phone } = verificationDto;

    const verificationCode = await this.verificationCodeModel.findOne({
      where: { code, phone },
    });

    if (!verificationCode) {
      throw new HttpException('Неверный код!', HttpStatus.BAD_REQUEST);
    }

    await this.verifiedPhoneModel.create({ phone });

    return { verified: true };
  }
}
