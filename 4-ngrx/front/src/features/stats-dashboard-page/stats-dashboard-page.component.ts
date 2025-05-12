import { CommonModule } from "@angular/common";
import { Component, computed, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { StatsDashboardPageService } from "./services/stats-dashboard-page.service";

@Component({
  selector: 'app-stats-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-dashboard-page.component.html',
  styleUrl: './stats-dashboard-page.component.scss',
})
export class StatsDashboardPageComponent {
  private readonly statsDashboardPageService = inject(StatsDashboardPageService);
  readonly routinesWithStatus = this.statsDashboardPageService.routinesWithStatuses;
  constructor() {
    this.statsDashboardPageService.fetchAll();
  }
}
