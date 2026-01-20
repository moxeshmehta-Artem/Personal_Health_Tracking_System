import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.scss'
})
export class PatientDashboardComponent implements OnInit {
  currentUser: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // Get the full user object from the mock "database" using the token email
    const email = this.getEmailFromToken();
    if (email) {
      const users = (this.authService as any).getUsers(); // Access private method hack for demo
      this.currentUser = users.find((u: any) => u.email === email);
    }
  }

  getEmailFromToken(): string | null {
    const token = this.authService.getToken();
    if (!token) return null;
    try {
      return JSON.parse(atob(token.split('.')[1])).email;
    } catch (e) { return null; }
  }
}
