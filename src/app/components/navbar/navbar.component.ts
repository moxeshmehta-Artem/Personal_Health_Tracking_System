import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        routerLink: '/'
      },
      {
        label: 'Add Health',
        icon: 'pi pi-plus',
        routerLink: '/add-health'
      },
      {
        label: 'History',
        icon: 'pi pi-history',
        routerLink: '/history'
      },
      {
        label: 'Tips',
        icon: 'pi pi-info-circle',
        routerLink: '/tips'
      },
      {
        label: 'Patient Registration',
        icon: 'pi pi-user',
        routerLink: '/patient-reg'
      }
    ];
  }
}
