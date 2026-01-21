import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, CardModule, TableModule, ButtonModule, DialogModule, InputTextareaModule, CalendarModule, InputTextModule, ToggleButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  patients: any[] = [];
  displayNoteDialog: boolean = false;
  selectedPatient: any = null;
  noteContent: string = '';

  displayAvailabilityDialog: boolean = false;
  availabilitySlots: any[] = [];
  newSlot: any = { date: '', startTime: '', endTime: '' };
  isAvailable: boolean = true; // Default to available

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loadPatients();
  }

  loadPatients() {
    const dietitianEmail = this.authService.getCurrentUserEmail();
    if (dietitianEmail) {
      this.patients = this.authService.getMyPatients(dietitianEmail);
      this.loadAvailability(dietitianEmail);
      this.loadStatus(dietitianEmail);
    }
  }

  loadStatus(email: string) {
    const users = this.authService.getUsers();
    const user = users.find((u: any) => u.email === email);
    if (user && user.isAvailable !== undefined) {
      this.isAvailable = user.isAvailable;
    }
  }

  toggleStatus() {
    this.isAvailable = !this.isAvailable;
    const email = this.authService.getCurrentUserEmail();
    if (email) {
      this.authService.updateDoctorStatus(email, this.isAvailable);
    }
  }

  loadAvailability(email: string) {
    const users = this.authService.getUsers();
    const user = users.find((u: any) => u.email === email);
    if (user && user.availability) {
      this.availabilitySlots = user.availability;
    }
  }

  openAvailabilityDialog() {
    this.displayAvailabilityDialog = true;
  }

  addSlot() {
    if (this.newSlot.date && this.newSlot.startTime && this.newSlot.endTime) {
      this.availabilitySlots.push({ ...this.newSlot, id: Date.now().toString() });
      this.saveAvailability();
      this.newSlot = { date: '', startTime: '', endTime: '' };
    }
  }

  removeSlot(index: number) {
    this.availabilitySlots.splice(index, 1);
    this.saveAvailability();
  }

  saveAvailability() {
    const email = this.authService.getCurrentUserEmail();
    if (email) {
      this.authService.updateAvailability(email, this.availabilitySlots);
    }
  }

  toggleConsultation(patient: any) {
    const newStatus = patient.consultationStatus === 'active' ? 'inactive' : 'active';
    this.authService.updateConsultationStatus(patient.email, newStatus);
    this.loadPatients();
  }

  openNoteDialog(patient: any) {
    if (patient.consultationStatus !== 'active') {
      alert('You must start the consultation to edit notes.');
      return;
    }
    this.selectedPatient = patient;
    this.noteContent = patient.notes || '';
    this.displayNoteDialog = true;
  }

  saveNote() {
    if (this.selectedPatient) {
      this.authService.updatePatientNotes(this.selectedPatient.email, this.noteContent);
      this.loadPatients(); // Reload to see updates
      this.displayNoteDialog = false;
      this.selectedPatient = null;
      this.noteContent = '';
    }
  }
}
