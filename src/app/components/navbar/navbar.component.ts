import { Component, inject } from '@angular/core';
import { Router, RouterLinkActive, RouterLink } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink
  ],
})
export class NavbarComponent {
  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor(private router: Router) {}

  navigateToSignIn() {
    this.router.navigate(['/signin']); // Navigate to the 'signin' route
  }
}
