import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HealthService } from '../../services/health.service';
import { Health } from '../../models/health.model';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-health-history',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, CardModule, DatePipe, TooltipModule],
  templateUrl: './health-history.component.html',
  styleUrl: './health-history.component.scss'
})
export class HealthHistoryComponent implements OnInit {
  private healthService = inject(HealthService);
  records: Health[] = [];

  ngOnInit() {
    this.healthService.healthRecords$.subscribe(data => {
      this.records = data;
    });
  }

  deleteRecord(index: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.healthService.deleteHealthRecord(index);
    }
  }
}
