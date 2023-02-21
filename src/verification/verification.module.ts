import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { VerificationController } from './verification.controller';
import { VerificationService } from './verification.service';
import { VerificationCode } from './verification-codes.model';
import { VerificationTime } from './verification-times.model';
import { VerifiedPhone } from './verified-phones.model';

@Module({
  providers: [VerificationService],
  controllers: [VerificationController],
  imports: [
    SequelizeModule.forFeature([
      VerificationCode,
      VerificationTime,
      VerifiedPhone,
      User,
    ]),
  ],
})
export class VerificationModule {}
