import { Component, computed, inject, model, OnInit, signal } from '@angular/core';
import { HomepageService } from './services/homepage.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { RoutineService } from '@domain/routine/routine.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  imports: [CommonModule, FormsModule],
  providers: [RoutineService],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements OnInit {
  private readonly homepageService = inject(HomepageService);
  private readonly router = inject(Router);

  readonly routines = this.homepageService.listRoutines;
  readonly searchTerm = model('');
  readonly expandedId = signal<string | null>(null);
  readonly filteredRoutines = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.routines().filter((r) => r.name.toLowerCase().includes(term));
  });

  ngOnInit(): void {
    this.homepageService.getRoutines();    
  }

  toggleExpanded(id: string) {
    this.expandedId.set(this.expandedId() === id ? null : id);
  }

  editRoutine(id: string) {
    this.router.navigate(['/edit', id], { state: { mode: 'edit' } });
  }

  goToCreate() {
    this.router.navigate(['/new']);
  }

  toggleOccurrence(routineId: string, occIdx: number, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.homepageService
      .toggleOccurrenceDone(routineId, occIdx, checked);
  }
}
