import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HealthEntryComponent } from './components/health-entry/health-entry.component';
import { HealthHistoryComponent } from './components/health-history/health-history.component';
import { HealthTipsComponent } from './components/health-tips/health-tips.component';
import { PatientRegComponent } from './components/patient-reg/patient-reg.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'add-health', component: HealthEntryComponent },
    { path: 'history', component: HealthHistoryComponent },
    { path: 'tips', component: HealthTipsComponent },
    { path: 'patient-reg', component: PatientRegComponent },
    { path: '**', redirectTo: '' },
];
