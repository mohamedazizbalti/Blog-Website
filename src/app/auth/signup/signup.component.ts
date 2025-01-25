import { Component, inject } from '@angular/core';
import {ContainerComponent} from '../../components/container/container.component';
import { Router } from '@angular/router';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import {UniqueValidators} from './validators';
import {UserService} from '../../services/userService/user.service';

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
  private  userService = inject(UserService) ;
  form :FormGroup;
  constructor() {
    this.form = new FormGroup({
      name: new FormControl(''),
      lastName: new FormControl(''),
      username: new FormControl('', [Validators.required] , [UniqueValidators.usernameValidator(this.userService)]),
      bio : new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email] , [UniqueValidators.emailValidator(this.userService)]),
      password: new FormControl('',  [Validators.required, Validators.minLength(6)]),
      checkPassword: new FormControl('', [Validators.required, Validators.minLength(6)])

    },
      { validators: this.passwordsMatchValidator }
    );
  }

  passwordsMatchValidator: ValidatorFn = (group: AbstractControl): { [key: string]: any } | null => {
    const password = group.get('password')?.value;
    const checkPassword = group.get('checkPassword')?.value;
    return password === checkPassword ? null : { passwordsMismatch: true };
  };

  navigateToSignIn() {
    this.router.navigate(['/signin']);
  }

  signUp(){
    if (this.form.valid) {
      const {name,lastName,username,bio,email, password} = this.form.value;
      this.authService.signup({name,lastName,username,bio,email, password});
    }
  }

  isdisabledBtn(){
    return this.form.get('password')?.hasError("required") || this.form.get('checkPassword')?.hasError("required") || this.form.get("username")?.hasError("required") || this.form.get("email")?.hasError("required") ;
  }

}
