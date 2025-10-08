import { NestFactory } from '@nestjs/core';
import { WorkflowServiceModule } from './workflow-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(WorkflowServiceModule);
  app.useGlobalPipes(new ValidationPipe());

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.RMQ,
      options: {
        urls: process.env.RABBITMQ_URL ? [process.env.RABBITMQ_URL] : [],
        queue: 'workflow-service'
      },
    });

  await app.startAllMicroservices();

  await app.listen(process.env.port ?? 3001);
}
bootstrap();
