import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Type } from 'src/types/types.model';
import { FeaturesController } from './features.controller';
import { Feature } from './features.model';
import { FeaturesService } from './features.service';
import { TypeFeatures } from './type-features.model';

@Module({
  controllers: [FeaturesController],
  providers: [FeaturesService],
  imports: [SequelizeModule.forFeature([Feature, Type, TypeFeatures])],
})
export class FeaturesModule {}
