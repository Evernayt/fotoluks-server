import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotificationCategoriesService } from './notification-categories.service';
import { NotificationCategory } from './notification-categories.model';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreateNotificationCategoryDto } from './dto/create-notification-category.dto';

@ApiTags('Категории уведомлений')
@Controller('notification-categories')
export class NotificationCategoriesController {
  constructor(
    private notificationCategoriesService: NotificationCategoriesService,
  ) {}

  @ApiOperation({ summary: 'Создание категории уведомления' })
  @ApiResponse({ status: 200, type: NotificationCategory })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createNotificationCategoryDto: CreateNotificationCategoryDto) {
    return this.notificationCategoriesService.createNotificationCategory(
      createNotificationCategoryDto,
    );
  }
}
