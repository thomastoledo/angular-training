import { TestBed } from '@angular/core/testing';

import { StatsDashboardPageService } from './stats-dashboard-page.service';

describe('StatsDashboardPageService', () => {
  let service: StatsDashboardPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatsDashboardPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
