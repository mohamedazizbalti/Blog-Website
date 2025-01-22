import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { CredentialsDto } from '../dto/credentials.dto';
import { Observable } from 'rxjs';
import { LoginResponseDto } from '../dto/login-response.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  public isAuth = signal<boolean>(false);
  constructor() {
    const token = localStorage.getItem('token');
    this.isAuth.set(!!token);
  }
  login(credintials:CredentialsDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>('http://localhost:3000/auth/login', credintials);
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
