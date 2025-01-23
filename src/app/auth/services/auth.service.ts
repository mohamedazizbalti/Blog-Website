import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { CredentialsDto } from '../dto/credentials.dto';
import { Observable } from 'rxjs';
import { LoginResponseDto } from '../dto/login-response.dto';
import { API } from '../../../config/api.config';
import { Router } from '@angular/router';

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
  /*
  signin(credentials:CredentialsDto){
    return this.http.post<LoginResponseDto>(API.login, credentials).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.id);
        localStorage.setItem('userId', response.userId.toString());
        localStorage.setItem("email", credentials.email);
        this.router.navigate(['']);
        this.isAuth.set(true)
      },
      error: (error) => {
        console.log(error);
        // this.toastr.error('Veuillez vérifier vos credentials');
      },
    });;
  }
  */

  signin(credentials: CredentialsDto) {
    localStorage.setItem('token',JSON.stringify(credentials));
    localStorage.setItem('email',credentials.email);
    localStorage.setItem('userId', String(credentials.password.length) );
    this.isAuth.set(true); 
  }

  isAuthenticated(): boolean {
    return this.isAuth()
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    this.isAuth.set(false)
  }


}
