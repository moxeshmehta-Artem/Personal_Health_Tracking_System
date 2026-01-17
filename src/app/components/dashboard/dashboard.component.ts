import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthService } from '../../services/health.service';
import { Health } from '../../models/health.model';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private healthService = inject(HealthService);
  latestRecord: Health | null = null;
  totalRecords = 0;

  ngOnInit() {
    this.healthService.healthRecords$.subscribe(records => {
      this.totalRecords = records.length;
      if (records.length > 0) {
        // Assuming the last record in the array is the latest one added
        this.latestRecord = records[records.length - 1];
      } else {
        this.latestRecord = null;
      }
    });
  }
}
