import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HealthEntryComponent } from './components/health-entry/health-entry.component';
import { HealthHistoryComponent } from './components/health-history/health-history.component';
import { HealthTipsComponent } from './components/health-tips/health-tips.component';
import { PatientRegComponent } from './components/patient-reg/patient-reg.component';
import { PatientDashboardComponent } from './components/patient-dashboard/patient-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },

    // Admin Routes (Super User)
    {
        path: 'admin-dashboard',
        component: AdminDashboardComponent,
        canActivate: [authGuard, roleGuard],
        data: { role: 'admin' }
    },

    // Dietitian Routes (Formerly "Admin", now Doctor)
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard, roleGuard],
        data: { role: 'dietitian' }
    },
    {
        path: 'add-health',
        component: HealthEntryComponent,
        canActivate: [authGuard, roleGuard],
        data: { role: 'dietitian' }
    },
    {
        path: 'history',
        component: HealthHistoryComponent,
        canActivate: [authGuard, roleGuard],
        data: { role: 'dietitian' }
    },

    // Patient Routes
    {
        path: 'patient-dashboard',
        component: PatientDashboardComponent,
        canActivate: [authGuard, roleGuard],
        data: { role: 'patient' }
    },

    // Shared Routes
    {
        path: 'tips',
        component: HealthTipsComponent,
        canActivate: [authGuard]
    },

    { path: 'patient-reg', component: PatientRegComponent },
    { path: '**', redirectTo: '' },
];
