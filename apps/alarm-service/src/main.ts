import { NestFactory } from '@nestjs/core';
import { AlarmServiceModule } from './alarm-service.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AlarmServiceModule);
  app.useGlobalPipes(new ValidationPipe());
  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.NATS,
      options: {
        servers: process.env.NATS_URL,
        queue: 'alarm-service',
      },
    },
    {
      inheritAppConfig: true,
    }
  );
  await app.startAllMicroservices();
  await app.listen(process.env.port ?? 3003);
}
bootstrap();
