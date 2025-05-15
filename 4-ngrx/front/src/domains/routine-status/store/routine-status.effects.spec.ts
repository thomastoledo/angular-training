import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { RoutineStatusEffects } from './routine-status.effects';

describe('RoutineStatusEffects', () => {
  let actions$: Observable<any>;
  let effects: RoutineStatusEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RoutineStatusEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(RoutineStatusEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
