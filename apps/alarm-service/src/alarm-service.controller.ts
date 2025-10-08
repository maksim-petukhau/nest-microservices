import { Controller, Inject, Logger } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { MESSAGE_BROKER } from './constants';
import { lastValueFrom } from 'rxjs';

@Controller()
export class AlarmServiceController {
  private readonly logger = new Logger(AlarmServiceController.name);  
  constructor(
    @Inject(MESSAGE_BROKER) private readonly messageBroker: ClientProxy,
  ) {}

  @EventPattern('alarm.created')
  async create(@Payload() data: {name: string, buildingId: number}) {
    this.logger.log(`Received alarm created: ${JSON.stringify(data)}`);

    const alarmClassification = await lastValueFrom(
      this.messageBroker.send('alarm.classify', data),
    );

    this.logger.log(`Alarm ${data.name} classified as: ${alarmClassification.category}`);

    const notification = this.messageBroker.emit('notification.send', {
      alarm: data,
      classification: alarmClassification,
    });
    await lastValueFrom(notification);
    this.logger.log(`Notification sent: ${JSON.stringify(notification)}`);
  }
}
