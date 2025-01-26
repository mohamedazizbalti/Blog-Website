import { Component, inject } from '@angular/core';
import { Router, RouterLinkActive, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink,
    
  ],
})
export class NavbarComponent {
  private router = inject(Router);
  authService = inject(AuthService);
  constructor() {}
  signout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
