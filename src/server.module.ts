import { TaskMembersModule } from './task-members/task-members.module';
import { TaskMessagesModule } from './task-messages/task-messages.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { EmployeesModule } from './employees/employees.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ShopsModule } from './shops/shops.module';
import { AppsModule } from './apps/apps.module';
import * as path from 'path';
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
  ],
})
export class ServerModule {}
