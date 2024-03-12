import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { TaskMembersModule } from './task-members/task-members.module';
import { TaskMessagesModule } from './task-messages/task-messages.module';
import { UsersModule } from './users/users.module';
import { EmployeesModule } from './employees/employees.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { ShopsModule } from './shops/shops.module';
import { AppsModule } from './apps/apps.module';
import { MoyskladModule } from './moysklad/moysklad.module';
import { DepartmentsModule } from './departments/departments.module';
import { VerificationModule } from './verification/verification.module';
import { OrdersModule } from './orders/orders.module';
import { OrderInfosModule } from './order-infos/order-infos.module';
import { StatusesModule } from './statuses/statuses.module';
import { NotificationsModule } from './notifications/notifications.module';
import { FavoritesModule } from './favorites/favorites.module';
import { OrderMembersModule } from './order-members/order-members.module';
import { GatewayModule } from './common/gateway/gateway.module';
import { TasksModule } from './tasks/tasks.module';
import { NotificationCategoriesModule } from './notification-categories/notification-categories.module';
import { RolesModule } from './roles/roles.module';
import { TaskSubtasksModule } from './task-subtasks/task-subtasks.module';
import { ProductsModule } from './products/products.module';
import { OrderProductsModule } from './order-products/order-products.module';
import { ReportsModule } from './reports/reports.module';
import { ChangelogsModule } from './changelogs/changelogs.module';
import { OrderFilesModule } from './order-files/order-files.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ChatsModule } from './chats/chats.module';
import { ChatMessagesModule } from './chat-messages/chat-messages.module';
import { ChatMembersModule } from './chat-members/chat-members.module';
import { ChatReadMessagesModule } from './chat-read-messages/chat-read-messages.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '../static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'mariadb',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_HOST),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true,
      //sync: { force: true },
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    EmployeesModule,
    AuthModule,
    FilesModule,
    ShopsModule,
    AppsModule,
    MoyskladModule,
    DepartmentsModule,
    VerificationModule,
    OrdersModule,
    OrderInfosModule,
    StatusesModule,
    NotificationsModule,
    FavoritesModule,
    OrderMembersModule,
    GatewayModule,
    TasksModule,
    TaskMessagesModule,
    TaskMembersModule,
    NotificationCategoriesModule,
    RolesModule,
    TaskSubtasksModule,
    ProductsModule,
    OrderProductsModule,
    ReportsModule,
    ChangelogsModule,
    OrderFilesModule,
    ChatsModule,
    ChatMessagesModule,
    ChatMembersModule,
    ChatReadMessagesModule,
  ],
})
export class ServerModule {}
