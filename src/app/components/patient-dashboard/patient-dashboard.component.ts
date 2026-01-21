import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule, DropdownModule, ButtonModule, FormsModule],
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.scss'
})
export class PatientDashboardComponent implements OnInit {
  currentUser: any;
  availableDietitians: any[] = [];
  selectedDietitian: any = null;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.refreshUser();
    this.availableDietitians = this.authService.getDietitians()
      .filter((d: any) => d.isAvailable !== false) // Treat undefined as true (default available)
      .map((d: any) => ({
        label: `Dr. ${d.firstname} ${d.lastname}`,
        value: d.email
      }));
  }

  doctorAvailability: any[] = [];

  refreshUser() {
    const email = this.getEmailFromToken();
    if (email) {
      const users = (this.authService as any).getUsers();
      this.currentUser = users.find((u: any) => u.email === email);

      if (this.currentUser?.assignedDietitian) {
        this.loadDoctorAvailability(this.currentUser.assignedDietitian);
      }
    }
  }

  loadDoctorAvailability(dietitianEmail: string) {
    const users = (this.authService as any).getUsers();
    const dietitian = users.find((u: any) => u.email === dietitianEmail);
    if (dietitian && dietitian.availability) {
      this.doctorAvailability = dietitian.availability;
    }
  }

  assignDoctor() {
    if (this.selectedDietitian && this.currentUser) {
      this.authService.assignDietitian(this.currentUser.email, this.selectedDietitian);
      this.refreshUser();
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
