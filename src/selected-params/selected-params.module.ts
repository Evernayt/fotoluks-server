import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SelectedParam } from './selected-params.model';

@Module({
  imports: [SequelizeModule.forFeature([SelectedParam])],
})
export class SelectedParamsModule {}
