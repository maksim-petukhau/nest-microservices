import { Test, TestingModule } from '@nestjs/testing';
import { AlarmServiceController } from './alarm-service.controller';
import { AlarmServiceService } from './alarm-service.service';

describe('AlarmServiceController', () => {
  let alarmServiceController: AlarmServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AlarmServiceController],
      providers: [AlarmServiceService],
    }).compile();

    alarmServiceController = app.get<AlarmServiceController>(AlarmServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(alarmServiceController.getHello()).toBe('Hello World!');
    });
  });
});
