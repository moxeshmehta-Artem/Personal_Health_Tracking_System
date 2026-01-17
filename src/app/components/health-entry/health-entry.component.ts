import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HealthService } from '../../services/health.service';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { Health } from '../../models/health.model';

@Component({
  selector: 'app-health-entry',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    CalendarModule,
    CardModule
  ],
  templateUrl: './health-entry.component.html',
  styleUrl: './health-entry.component.scss'
})
export class HealthEntryComponent {
  private fb = inject(FormBuilder);
  private healthService = inject(HealthService);
  private router = inject(Router);

  healthForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    date: [new Date(), Validators.required],
    weight: [null, [Validators.required, Validators.min(1)]],
    height: [null, [Validators.required, Validators.min(0.5)]],
    bp: ['', Validators.required],
    sugar: [null, Validators.required],
    heartRate: [null, Validators.required]
  });

  calculateBMI(weight: number, height: number): { bmi: number; category: string } {
    const bmi = +(weight / (height * height)).toFixed(2);
    let category = '';

    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 25) category = 'Normal';
    else if (bmi < 30) category = 'Overweight';
    else category = 'Obese';

    return { bmi, category };
  }

  generateDietPlan(category: string): string {
    switch (category) {
      case 'Underweight':
        return 'High-calorie diet with plenty of protein and healthy fats. Include nuts, dairy, and lean meats.';
      case 'Normal':
        return 'Balanced diet rich in fruits, vegetables, whole grains, and lean proteins. Maintain regular hydration.';
      case 'Overweight':
        return 'Calorie-controlled diet. Focus on whole foods, reduce sugar and saturated fats. Increase fibre intake.';
      case 'Obese':
        return 'Strict low-calorie diet. Consult a nutritionist. Avoid processed foods and sugary drinks completely.';
      default:
        return 'Maintain a healthy balanced diet.';
    }
  }

  onSubmit() {
    if (this.healthForm.valid) {
      const formValue = this.healthForm.value;
      const { bmi, category } = this.calculateBMI(formValue.weight, formValue.height);
      const dietPlan = this.generateDietPlan(category);

      const healthRecord: Health = {
        name: formValue.name,
        date: formValue.date.toISOString(), // simplified date string
        weight: formValue.weight,
        height: formValue.height,
        bmi: bmi,
        bmiCategory: category,
        dietPlan: dietPlan,
        bp: formValue.bp,
        sugar: formValue.sugar,
        heartRate: formValue.heartRate
      };

      this.healthService.addHealthRecord(healthRecord);
      this.router.navigate(['/']);
    }
  }
}
