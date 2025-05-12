import { Test, TestingModule } from '@nestjs/testing';
import { RoutineStatusController } from './routine-status.controller';

describe('RoutineStatusController', () => {
  let controller: RoutineStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoutineStatusController],
    }).compile();

    controller = module.get<RoutineStatusController>(RoutineStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
