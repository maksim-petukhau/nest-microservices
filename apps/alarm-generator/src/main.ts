import { NestFactory } from '@nestjs/core';
import { AlarmGeneratorModule } from './alarm-generator.module';

async function bootstrap() {
  await NestFactory.createApplicationContext (AlarmGeneratorModule);
}
bootstrap();
