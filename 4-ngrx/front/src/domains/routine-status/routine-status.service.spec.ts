import { TestBed } from '@angular/core/testing';

import { RoutineStatusService } from './routine-status.service';

describe('RoutineStatusService', () => {
  let service: RoutineStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutineStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
