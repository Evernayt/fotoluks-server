import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SelectedParamsController } from './selected-params.controller';
import { SelectedParam } from './selected-params.model';
import { SelectedParamsService } from './selected-params.service';

@Module({
  providers: [SelectedParamsService],
  controllers: [SelectedParamsController],
  imports: [SequelizeModule.forFeature([SelectedParam])],
})
export class SelectedParamsModule {}
