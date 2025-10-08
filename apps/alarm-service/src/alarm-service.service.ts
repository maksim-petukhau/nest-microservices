import { Injectable } from '@nestjs/common';

@Injectable()
export class AlarmServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
