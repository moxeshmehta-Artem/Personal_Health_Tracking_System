import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, CardModule, TableModule, ButtonModule, DialogModule, InputTextareaModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  patients: any[] = [];
  displayNoteDialog: boolean = false;
  selectedPatient: any = null;
  noteContent: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loadPatients();
  }

  loadPatients() {
    this.patients = this.authService.getPatients();
  }

  openNoteDialog(patient: any) {
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
