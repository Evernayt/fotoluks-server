import { Module, forwardRef } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Report } from './reports.model';
import { ReportsController } from './reports.controller';

@Module({
  providers: [ReportsService],
  controllers: [ReportsController],
  imports: [SequelizeModule.forFeature([Report]), forwardRef(() => AuthModule)],
})
export class ReportsModule {}
