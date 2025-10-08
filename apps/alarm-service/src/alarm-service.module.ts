import { Module } from '@nestjs/common';
import { AlarmServiceController } from './alarm-service.controller';
import { MESSAGE_BROKER } from './constants';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MESSAGE_BROKER,
        transport: Transport.NATS,
        options: {
          servers: process.env.NATS_URL,
        },
      },
    ]),
  ],
  controllers: [AlarmServiceController],
  providers: [],
})
export class AlarmServiceModule {}
