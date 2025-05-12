import { computed, inject, Injectable } from '@angular/core';
import { compose, Store } from '@ngrx/store';
import { RoutineStatusPageActions } from '@domain/routine-status/store/routine-status.actions';
import { selectAllStatuses } from '@domain/routine-status/store/routine-status.selectors';
import { RoutinePageActions } from '@domain/routine/store/routine.actions';
import { selectAllRoutines } from '@domain/routine/store/routine.selectors';

@Injectable({
  providedIn: 'root',
})
export class StatsDashboardPageService {
  private readonly store = inject(Store);

  private readonly routinesSignal = this.store.selectSignal(selectAllRoutines);
  private readonly statusesSignal = this.store.selectSignal(selectAllStatuses);
  readonly routinesWithStatuses = computed(() => {
    const statusMap = new Map(this.statusesSignal().map(s => [s.routineId, s]));
    return this.routinesSignal().map(routine => {
      return ({
      ...routine,
      doneOccurrences: statusMap.get(routine.id)?.doneOccurrences ?? []
    })});
  })

  fetchAll(): void {
    this.store.dispatch(RoutinePageActions.enter());
    this.store.dispatch(RoutineStatusPageActions.enter());
  }
}
