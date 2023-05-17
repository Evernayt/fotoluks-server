import { Module, forwardRef } from '@nestjs/common';
import { NotificationCategoriesService } from './notification-categories.service';
import { NotificationCategoriesController } from './notification-categories.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { NotificationCategory } from './notification-categories.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [NotificationCategoriesController],
  providers: [NotificationCategoriesService],
  imports: [
    SequelizeModule.forFeature([NotificationCategory]),
    forwardRef(() => AuthModule),
  ],
})
export class NotificationCategoriesModule {}
