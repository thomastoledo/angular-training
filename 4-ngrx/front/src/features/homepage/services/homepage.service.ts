import { computed, inject, Injectable, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { RoutineStatusPageActions } from '@domain/routine-status/store/routine-status.actions';
import { selectAllStatuses } from '@domain/routine-status/store/routine-status.selectors';
import { RoutinePageActions } from '@domain/routine/store/routine.actions';
import { selectAllRoutines } from '@domain/routine/store/routine.selectors';

@Injectable({
  providedIn: 'root',
})
export class HomepageService {
  private readonly store = inject(Store);

  readonly routinesSignal = this.store.selectSignal(selectAllRoutines);
  readonly statusesSignal = this.store.selectSignal(selectAllStatuses);
  readonly routinesWithOccurrencesArray = computed(() => {
    return this.routinesSignal().map((routine) => {
      return {
        ...routine,
        occurences: Array.from({ length: routine.reccurenceCoef }, (_, i) => i),
      };
    });
  });
  readonly routineStatusesMap = computed(() => {
    return new Map(
      this.statusesSignal().map((s) => [s.routineId, s.doneOccurrences])
    );
  });

  fetchAll(): void {
    this.store.dispatch(RoutinePageActions.enter());
    this.store.dispatch(RoutineStatusPageActions.enter());
  }

  toggleOccurrence(routineId: string, index: number, done: boolean): void {
    this.store.dispatch(
      RoutineStatusPageActions.toggleOccurrence({ routineId, index, done })
    );
  }
}
