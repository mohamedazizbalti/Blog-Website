import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { CredentialsDto } from '../dto/credentials.dto';
import { Observable } from 'rxjs';
import { LoginResponseDto } from '../dto/login-response.dto';
import { API } from '../../../config/api.config';
import { Router } from '@angular/router';
import { RegisterDto } from '../dto/register.dto';
import {PopupService} from '../../services/popupService/popup.service';
import {UserService} from '../../services/userService/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  public isAuth = signal<boolean>(false);
  private router = inject(Router);
  private userService = inject(UserService);

  constructor( private popupService :PopupService  ) {
    const token = localStorage.getItem('token');
    this.isAuth.set(!!token);
  }
  signin(credentials:CredentialsDto){
    return this.http.post<LoginResponseDto>(API.login, credentials).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.Authorization);
        localStorage.setItem("email", credentials.email);
        this.router.navigate(['/home']);
        this.isAuth.set(true) ;
        this.addCurrentUserInfo();
      },
      error: (error) => {
        console.log(error);
        this.popupService.show('An error occurred while signing in! Please verify your credentials');
        this.router.navigate(['/home']);
        },
    });
  }
  signup(registerDto:RegisterDto){
    return this.http.post<LoginResponseDto>(API.register, registerDto).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.Authorization);
        localStorage.setItem("email", registerDto.email);
        this.router.navigate(['/home']);
        this.isAuth.set(true);
        this.addCurrentUserInfo();
      },
      error: (error) => {
        console.log(error);
        this.router.navigate(['/signin']);
        // this.toastr.error('Veuillez vérifier vos credentials');
      },
    });;
  }

  isAuthenticated(): boolean {
    return this.isAuth()
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.isAuth.set(false)
  }

  addCurrentUserInfo(){
    this.userService.getCurrentUserInfo().subscribe({
      next: (user) => {
        localStorage.setItem("username", user.username);
        localStorage.setItem("userId", user.id);
        localStorage.setItem("name", user.name);
        localStorage.setItem("lastName", user.lastName);
      }
    })
  }

}
