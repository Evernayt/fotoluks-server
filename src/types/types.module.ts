import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Feature } from 'src/features/features.model';
import { TypeFeatures } from 'src/features/type-features.model';
import { Param } from 'src/params/params.model';
import { TypeParams } from 'src/params/type-params.model';
import { TypesController } from './types.controller';
import { Type } from './types.model';
import { TypesService } from './types.service';

@Module({
  controllers: [TypesController],
  providers: [TypesService],
  imports: [
    SequelizeModule.forFeature([
      Type,
      Feature,
      TypeFeatures,
      Param,
      TypeParams,
    ]),
    forwardRef(() => AuthModule),
  ],
})
export class TypesModule {}
