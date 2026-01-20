import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule, AsyncPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule, CommonModule, ButtonModule, RouterModule, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.items = [
        {
          label: 'Dashboard',
          icon: 'pi pi-home',
          routerLink: '/dashboard',
          visible: isLoggedIn
        },
        {
          label: 'Add Health',
          icon: 'pi pi-plus',
          routerLink: '/add-health',
          visible: isLoggedIn
        },
        {
          label: 'History',
          icon: 'pi pi-history',
          routerLink: '/history',
          visible: isLoggedIn
        },
        {
          label: 'Tips',
          icon: 'pi pi-info-circle',
          routerLink: '/tips',
          visible: isLoggedIn
        }
      ];
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
