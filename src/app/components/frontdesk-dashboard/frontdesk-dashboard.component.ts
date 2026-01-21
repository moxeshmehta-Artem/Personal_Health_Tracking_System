import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-frontdesk-dashboard',
    standalone: true,
    imports: [CommonModule, CardModule, ButtonModule],
    templateUrl: './frontdesk-dashboard.component.html',
    styles: [`
    :host {
      display: block;
    }
  `]
})
export class FrontdeskDashboardComponent {
    currentUser: any;

    constructor(private router: Router, private authService: AuthService) {
        const email = this.authService.getCurrentUserEmail();
        if (email) {
            const users = this.authService.getUsers();
            this.currentUser = users.find(u => u.email === email);
        }
    }

    registerPatient() {
        this.router.navigate(['/patient-reg']);
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
