import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
  standalone: true
})
export class SigninComponent {

  constructor(private router: Router) {}

  navigateToSignUp() {
    this.router.navigate(['/signup']); // Navigate to the 'signin' route
  }

  signIn(){
    this.router.navigate(['/home']);
  }
}
