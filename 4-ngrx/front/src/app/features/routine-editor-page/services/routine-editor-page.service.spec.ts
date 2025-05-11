import { TestBed } from '@angular/core/testing';

import { RoutineEditorPageService } from './routine-editor-page.service';

describe('RoutineEditorPageService', () => {
  let service: RoutineEditorPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutineEditorPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
