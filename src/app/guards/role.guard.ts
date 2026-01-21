import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const expectedRole = route.data['role'];
    const userRole = authService.getUserRole();

    if (!authService.isLoggedIn()) {
        router.navigate(['/login']);
        return false;
    }

    if (expectedRole && userRole !== expectedRole) {
        // Redirect based on what they ARE, not just where they are going
        if (userRole === 'admin') {
            router.navigate(['/admin-dashboard']);
        } else if (userRole === 'dietitian') {
            router.navigate(['/dashboard']);
        } else if (userRole === 'frontdesk') {
            router.navigate(['/frontdesk-dashboard']);
        } else {
            router.navigate(['/patient-dashboard']);
        }
        return false;
    }

    return true;
};
