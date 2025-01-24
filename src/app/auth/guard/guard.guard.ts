// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {PopupService} from '../../services/popupService/popup.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router , private popupService: PopupService) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // Allow access to the route
    } else {
      this.router.navigate(['']); // Redirect to the sign-in page
      this.popupService.show('You must be logged in to access this page.');
      return false; // Deny access to the route
    }
  }
}
