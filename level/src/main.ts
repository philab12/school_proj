import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {config} from "dotenv";
import { useContainer } from 'class-validator';

config();


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), {fallbackOnErrors: true});
  await app.listen(`${process.env.PORT}`);
}
bootstrap();
