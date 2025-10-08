import { Module } from '@nestjs/common';
import { AlarmGeneratorService } from './alarm-generator.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ALARM_SERVICE } from './constants';

@Module({
  imports: [ScheduleModule.forRoot(),
    ClientsModule.register([
      {
        name: ALARM_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: process.env.NATS_URL,
          queue: 'alarm-service',  
        },
      },
    ]),
  ],
  controllers: [],
  providers: [AlarmGeneratorService],
})
export class AlarmGeneratorModule {}
