import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsDashboardPageComponent } from './stats-dashboard-page.component';

describe('StatsDashboardPageComponent', () => {
  let component: StatsDashboardPageComponent;
  let fixture: ComponentFixture<StatsDashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsDashboardPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
