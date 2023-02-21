import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import AuthAPI from './moysklad/api/AuthAPI/AuthAPI';
import { ServerModule } from './server.module';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const MOYSKLAD_LOGIN = process.env.MOYSKLAD_LOGIN;
  const MOYSKLAD_PASSWORD = process.env.MOYSKLAD_PASSWORD;

  const server = await NestFactory.create(ServerModule, { cors: true });

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
bootstrap();
