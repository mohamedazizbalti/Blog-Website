import { Component, inject } from '@angular/core';
import {Router} from '@angular/router';
import {ContainerComponent} from '../container/container.component';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule , Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
  standalone: true,
  imports: [ContainerComponent, ReactiveFormsModule]
})
export class SigninComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  form :FormGroup;

  //private authService = inject(AuthService);
  constructor() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',  [Validators.required, Validators.minLength(6)])
    });
  }

  navigateToSignUp() {
    this.router.navigate(['/signup']); // Navigate to the 'signin' route
  }

  signIn(){
    if (this.form.valid) {
      const {email, password} = this.form.value;
      this.authService.signin( {email, password});
    }
  }
}
