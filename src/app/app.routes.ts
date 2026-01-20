import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HealthEntryComponent } from './components/health-entry/health-entry.component';
import { HealthHistoryComponent } from './components/health-history/health-history.component';
import { HealthTipsComponent } from './components/health-tips/health-tips.component';
import { PatientRegComponent } from './components/patient-reg/patient-reg.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'add-health', component: HealthEntryComponent, canActivate: [authGuard] },
    { path: 'history', component: HealthHistoryComponent, canActivate: [authGuard] },
    { path: 'tips', component: HealthTipsComponent, canActivate: [authGuard] },
    { path: 'patient-reg', component: PatientRegComponent },
    { path: '**', redirectTo: '' },
];
