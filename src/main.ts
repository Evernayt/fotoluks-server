import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import AuthAPI from './moysklad/api/AuthAPI/AuthAPI';
import { ServerModule } from './server.module';
import * as bodyParser from 'body-parser';
import { initializeApp, cert } from 'firebase-admin/app';
import { CheckVersionGuard } from './common/global-guards/checkVersion.guard';
const serviceAccount = require('../firebase-adminsdk.json');
import * as fs from 'fs';
import * as path from 'path';

function createFolders() {
  const avatarPath = path.join(__dirname, '..', 'static', 'avatar');
  const managerPath = path.join(__dirname, '..', 'static', 'manager');
  const ordersPath = path.join(__dirname, '..', 'static', 'orders');
  const tasksPath = path.join(__dirname, '..', 'static', 'tasks');

  const paths = [avatarPath, managerPath, ordersPath, tasksPath];
  paths.forEach((path) => {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
  });
}

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const MOYSKLAD_LOGIN = process.env.MOYSKLAD_LOGIN;
  const MOYSKLAD_PASSWORD = process.env.MOYSKLAD_PASSWORD;
  const IS_DEV = process.env.IS_DEV === 'true';

  const server = await NestFactory.create(ServerModule, { cors: true });
  server.use(bodyParser.json({ limit: '50mb' }));
  server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
  server.useGlobalGuards(new CheckVersionGuard());

  initializeApp({
    credential: cert(serviceAccount),
  });

  const config = new DocumentBuilder()
    .setTitle('fotoluks-server')
    .setDescription('REST API документация')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(server, config);
  SwaggerModule.setup('/api/docs', server, document);

  await server.listen(PORT, () =>
    console.log(`[SERVER] STARTED ON PORT ${PORT}`),
  );

  if (!IS_DEV) {
    await AuthAPI.getToken({
      login: MOYSKLAD_LOGIN,
      password: MOYSKLAD_PASSWORD,
    })
      .then(() => {
        console.log('[SERVER] MOYSKLAD TOKEN RECEIVED');
      })
      .catch(() => {
        console.log('[SERVER] MOYSKLAD TOKEN NOT RECEIVED');
      });
  }
}

createFolders();
bootstrap();
