import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HealthEntryComponent } from './health-entry.component';
import { HealthService } from '../../services/health.service';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HealthEntryComponent', () => {
  let component: HealthEntryComponent;
  let fixture: ComponentFixture<HealthEntryComponent>;

  const healthServiceMock = {
    addHealthRecord: jasmine.createSpy('addHealthRecord')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthEntryComponent, BrowserAnimationsModule],
      providers: [
        { provide: HealthService, useValue: healthServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HealthEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invalidate form when empty', () => {
    expect(component.healthForm.valid).toBeFalsy();
  });
});
