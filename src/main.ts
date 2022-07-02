import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { ServiceAccount } from 'firebase-admin';
import * as admin from 'firebase-admin';

async function bootstrap() {

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  // const configService: ConfigService = app.get(ConfigService);

  const adminConfig: ServiceAccount = {
    "projectId": process.env.FIREBASE_PROJECT_ID,
    "privateKey": process.env.FIREBASE_PRIVATE_KEY
                               .replace(/\\n/g, '\n'),
    "clientEmail": process.env.FIREBASE_CLIENT_EMAIL,
  };
  // Initialize the firebase admin app
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
    databaseURL: process.env.DB_URL,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // app.useGlobalFilters(new AllExceptionsFilter());

  setupSwagger(app);

  
  const port = Number(process.env.PORT) || 3000;

  app.enableCors();

  await app.listen(port, '0.0.0.0');
  const url = await app.getUrl();
  console.log("running on ", url);
}
bootstrap();
