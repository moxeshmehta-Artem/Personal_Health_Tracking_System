import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HealthHistoryComponent } from './health-history.component';
import { HealthService } from '../../services/health.service';
import { BehaviorSubject } from 'rxjs';

describe('HealthHistoryComponent', () => {
  let component: HealthHistoryComponent;
  let fixture: ComponentFixture<HealthHistoryComponent>;
  const healthServiceMock = {
    healthRecords$: new BehaviorSubject([
      {
        name: 'John Doe',
        date: new Date().toISOString(),
        weight: 70,
        height: 1.75,
        bmi: 22.86,
        bmiCategory: 'Normal',
        bp: '120/80',
        sugar: 90,
        heartRate: 72,
        dietPlan: 'Balanced diet'
      }
    ]),
    deleteHealthRecord: jasmine.createSpy('deleteHealthRecord')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthHistoryComponent], // Standalone component is imported here
      providers: [
        { provide: HealthService, useValue: healthServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HealthHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display records', () => {
    component.ngOnInit();
    expect(component.records.length).toBe(1);
    expect(component.records[0].name).toBe('John Doe');
  });
});
