import { Test, TestingModule } from '@nestjs/testing';
import { RoutineStatusService } from './routine-status.service';

describe('RoutineStatusService', () => {
  let service: RoutineStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoutineStatusService],
    }).compile();

    service = module.get<RoutineStatusService>(RoutineStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
