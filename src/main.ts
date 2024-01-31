import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import AuthAPI from './moysklad/api/AuthAPI/AuthAPI';
import { ServerModule } from './server.module';
import * as bodyParser from 'body-parser';
import { initializeApp, cert } from 'firebase-admin/app';
import { CheckVersionGuard } from './checkVersion.guard';
const serviceAccount = require('../firebase-adminsdk.json');

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const MOYSKLAD_LOGIN = process.env.MOYSKLAD_LOGIN;
  const MOYSKLAD_PASSWORD = process.env.MOYSKLAD_PASSWORD;
  const IS_DEV = process.env.IS_DEV === 'true';

  const server = await NestFactory.create(ServerModule, { cors: true });
  server.use(bodyParser.json({ limit: '50mb' }));
  server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
  const reflector = server.get(Reflector);
  server.useGlobalGuards(new CheckVersionGuard(reflector));

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
bootstrap();
