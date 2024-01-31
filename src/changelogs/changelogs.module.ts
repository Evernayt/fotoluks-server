import { Module, forwardRef } from '@nestjs/common';
import { ChangelogsService } from './changelogs.service';
import { ChangelogsController } from './changelogs.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Changelog } from './changelogs.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [ChangelogsService],
  controllers: [ChangelogsController],
  imports: [
    SequelizeModule.forFeature([Changelog]),
    forwardRef(() => AuthModule),
  ],
})
export class ChangelogsModule {}
