import { Component, computed, inject, signal, model } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { HomepageService } from './services/homepage.service';
import { RoutineService } from '@domain/routine/routine.service';
import { RoutineStatusService } from '@domain/routine-status/routine-status.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
  providers: [RoutineService, RoutineStatusService],
})
export class HomepageComponent {
  private readonly homepageService = inject(HomepageService);
  private readonly router = inject(Router);

  readonly routines = this.homepageService.routinesWithOccurrencesArray;
  readonly routineStatusesMap = this.homepageService.routineStatusesMap;

  readonly searchTerm = model('');
  readonly expandedId = signal<string | null>(null);

  readonly filteredRoutines = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.routines().filter((r) => r.name.toLowerCase().includes(term));
  });


  constructor() {
    this.homepageService.fetchAll();
  }

  toggleExpanded(id: string) {
    this.expandedId.set(this.expandedId() === id ? null : id);
  }

  toggleOccurrence(routineId: string, index: number, event: Event) {
    this.homepageService.toggleOccurrence(routineId, index, (event.target as HTMLInputElement).checked);
  }

  editRoutine(id: string) {
    this.router.navigate(['/edit', id], { state: { mode: 'edit' } });
  }

  goToCreate() {
    this.router.navigate(['/new']);
  }
}
