import { Component, inject } from '@angular/core';
import {ContainerComponent} from '../../components/container/container.component';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [ContainerComponent, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  standalone:true
})
export class SignupComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  form :FormGroup;
  constructor() {
    this.form = new FormGroup({
      name: new FormControl(''),
      lastName: new FormControl(''),
      username: new FormControl('', [Validators.required]),
      bio : new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',  [Validators.required, Validators.minLength(6)]),
      checkPassword: new FormControl('', [Validators.required, Validators.minLength(6)])

    });
  }
  navigateToSignIn() {
    this.router.navigate(['/signin']);
  }
  signUp(){
    if (this.form.valid) {
      const {name,lastName,username,bio,email, password} = this.form.value;
      this.authService.signup({name,lastName,username,bio,email, password});
    }
  }
}
