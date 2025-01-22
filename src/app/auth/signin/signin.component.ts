import { Component, inject } from '@angular/core';
import {Router} from '@angular/router';
import {ContainerComponent} from '../../components/container/container.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
  standalone: true,
  imports:[ContainerComponent]
})
export class SigninComponent {
  private router = inject(Router);
  //private authService = inject(AuthService);
  constructor() { }

  navigateToSignUp() {
    this.router.navigate(['/signup']); // Navigate to the 'signin' route
  }

  signIn(){
    //this.authService.signin();
    this.router.navigate(['/home']);
  }
}
