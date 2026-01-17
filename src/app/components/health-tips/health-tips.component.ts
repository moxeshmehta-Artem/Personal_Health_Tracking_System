import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'app-health-tips',
  standalone: true,
  imports: [CardModule, AccordionModule],
  templateUrl: './health-tips.component.html',
  styleUrl: './health-tips.component.scss'
})
export class HealthTipsComponent { }
