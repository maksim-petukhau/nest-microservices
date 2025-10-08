import { Controller, Get, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class NotificationServiceController {

  private readonly logger = new Logger(NotificationServiceController.name);
  
  @MessagePattern('notification.send')
  sendNotification(@Payload() data: unknown) {
    this.logger.debug(
      `Sending new "notification.send" message: ${JSON.stringify(data)}`,
    );
  }
}
