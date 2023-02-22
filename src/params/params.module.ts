import { AuthModule } from './../auth/auth.module';
import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Type } from 'src/types/types.model';
import { ParamsController } from './params.controller';
import { Param } from './params.model';
import { ParamsService } from './params.service';
import { TypeParams } from './type-params.model';

@Module({
  controllers: [ParamsController],
  providers: [ParamsService],
  imports: [
    SequelizeModule.forFeature([Param, Type, TypeParams]),
    forwardRef(() => AuthModule),
  ],
})
export class ParamsModule {}
