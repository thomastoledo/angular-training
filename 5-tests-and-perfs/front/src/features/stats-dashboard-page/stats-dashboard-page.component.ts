import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { StatsDashboardPageService } from "./services/stats-dashboard-page.service";

@Component({
  selector: 'app-stats-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-dashboard-page.component.html',
  styleUrl: './stats-dashboard-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsDashboardPageComponent implements OnInit {
  private readonly statsDashboardPageService = inject(StatsDashboardPageService);
  readonly routinesWithStatus = this.statsDashboardPageService.routinesWithStatuses;
  
  ngOnInit(): void {
    this.statsDashboardPageService.fetchAll();
  }
}
