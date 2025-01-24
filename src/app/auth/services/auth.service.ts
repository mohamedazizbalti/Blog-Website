import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { CredentialsDto } from '../dto/credentials.dto';
import { Observable } from 'rxjs';
import { LoginResponseDto } from '../dto/login-response.dto';
import { API } from '../../../config/api.config';
import { Router } from '@angular/router';
import { RegisterDto } from '../dto/register.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  public isAuth = signal<boolean>(false);
  private router = inject(Router);
  constructor() {
    const token = localStorage.getItem('token');
    this.isAuth.set(!!token);
  }
  signin(credentials:CredentialsDto){
    return this.http.post<LoginResponseDto>(API.login, credentials).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.Authorization);
        localStorage.setItem("email", credentials.email);
        this.router.navigate(['/home']);
        this.isAuth.set(true)
      },
      error: (error) => {
        console.log(error);
        this.router.navigate(['']);
        // this.toastr.error('Veuillez vérifier vos credentials');
      },
    });;
  }
  signup(registerDto:RegisterDto){
    return this.http.post<LoginResponseDto>(API.register, registerDto).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.Authorization);
        localStorage.setItem("email", registerDto.email);
        this.router.navigate(['/home']);
        this.isAuth.set(true)
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


}
