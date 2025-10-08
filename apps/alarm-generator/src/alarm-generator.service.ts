import { Inject, Injectable } from '@nestjs/common';
import { ALARM_SERVICE } from './constants';
import { ClientProxy } from '@nestjs/microservices';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class AlarmGeneratorService {
  constructor(
    @Inject(ALARM_SERVICE)
    private readonly alarmClient: ClientProxy,
  ) {}

  //@Interval(1000)
  async generateAlarms() {
    console.log('Generating alarm');
    const alarmEvent = {
      name: "Alarm" + Math.random().toString(36).substring(2, 15),
      buildingId: Math.floor(Math.random() * 1000),
    };
    this.alarmClient.emit('alarm.created', alarmEvent);
  }
}
