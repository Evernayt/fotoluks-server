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
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { TypesModule } from './types/types.module';
import { FeaturesModule } from './features/features.module';
import { ParamsModule } from './params/params.module';
import { VerificationModule } from './verification/verification.module';
import { OrdersModule } from './orders/orders.module';
import { OrderInfosModule } from './order-infos/order-infos.module';
import { StatusesModule } from './statuses/statuses.module';
import { FinishedProductsModule } from './finished-products/finished-products.module';
import { SelectedParamsModule } from './selected-params/selected-params.module';
import { NotificationsModule } from './notifications/notifications.module';
import { FavoritesModule } from './favorites/favorites.module';
import { OrderMembersModule } from './order-members/order-members.module';
import { FavoriteParamsModule } from './favorite-params/favorite-params.module';
import { GatewayModule } from './gateway/gateway.module';

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
    }),
    UsersModule,
    EmployeesModule,
    AuthModule,
    FilesModule,
    ShopsModule,
    AppsModule,
    MoyskladModule,
    DepartmentsModule,
    CategoriesModule,
    ProductsModule,
    TypesModule,
    FeaturesModule,
    ParamsModule,
    VerificationModule,
    OrdersModule,
    OrderInfosModule,
    StatusesModule,
    FinishedProductsModule,
    SelectedParamsModule,
    NotificationsModule,
    FavoritesModule,
    OrderMembersModule,
    FavoriteParamsModule,
    GatewayModule,
  ],
})
export class ServerModule {}
