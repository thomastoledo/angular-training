import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { RoutineEffects } from './routine.effects';

describe('RoutineEffects', () => {
  let actions$: Observable<any>;
  let effects: RoutineEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RoutineEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(RoutineEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
