import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NotificationCategory } from './notification-categories.model';
import { CreateNotificationCategoryDto } from './dto/create-notification-category.dto';

@Injectable()
export class NotificationCategoriesService {
  constructor(
    @InjectModel(NotificationCategory)
    private notificationCategoryModel: typeof NotificationCategory,
  ) {}

  async createNotificationCategory(
    createNotificationCategoryDto: CreateNotificationCategoryDto,
  ) {
    const notificationCategory = await this.notificationCategoryModel.create(
      createNotificationCategoryDto,
    );
    return notificationCategory;
  }
}
