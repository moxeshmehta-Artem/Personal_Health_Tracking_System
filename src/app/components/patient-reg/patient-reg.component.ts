import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-patient-reg',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, DropdownModule, InputTextModule, ButtonModule, InputMaskModule, CardModule],
  templateUrl: './patient-reg.component.html',
  styleUrl: './patient-reg.component.scss'
})
export class PatientRegComponent {
  patientform: FormGroup;
  genders: any[] = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' }
  ];

  constructor(private fb: FormBuilder) {
    this.patientform = this.fb.group({
      firstname: ['', [Validators.required,
      Validators.minLength(2),
      Validators.pattern('^[a-zA-Z ]+$')]],
      lastname: ['', [Validators.required,
      Validators.minLength(2),
      Validators.pattern('^[a-zA-Z ]+$')]],
      age: ['', [Validators.required,
      Validators.min(1),
      Validators.max(120)]],
      gender: ['', Validators.required],
      phone: this.fb.array([this.fb.control('', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ])]),
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).+$')
      ]],
      confirmPassword: ['', Validators.required],
    },
      { validators: this.passwordMatchValidator });
  }
  passwordMatchValidator(form: any) {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  get phones() {
    return this.patientform.get('phone') as FormArray;
  }

  addPhone() {
    this.phones.push(this.fb.control(''));
  }

  removePhone(index: number) {
    this.phones.removeAt(index);
  }

  onSubmit() {
    console.log(this.patientform.value);
  }
}
