import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TableModule, ButtonModule, DialogModule, InputTextModule, CardModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  dietitians: any[] = [];
  displayDialog: boolean = false;
  dietitianForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.dietitianForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.loadDietitians();
  }

  loadDietitians() {
    this.dietitians = this.authService.getDietitians();
  }

  showDialog() {
    this.displayDialog = true;
  }

  onSubmit() {
    if (this.dietitianForm.valid) {
      this.authService.addDietitian(this.dietitianForm.value);
      this.loadDietitians();
      this.displayDialog = false;
      this.dietitianForm.reset();
    }
  }

  deleteDietitian(email: string) {
    if (confirm('Are you sure you want to remove this dietitian?')) {
      this.authService.removeUser(email);
      this.loadDietitians();
    }
  }
}
