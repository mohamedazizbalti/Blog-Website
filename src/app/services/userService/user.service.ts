import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API } from '../../../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  isUsernameTaken(username: string): Observable<boolean> {
    return this.http.get<{ exists: boolean }>(API.findUserByUsername+username).pipe(
      map(response => response.exists)
    );
  }

  isEmailTaken(email: string): Observable<boolean> {
    return this.http.get<{ exists: boolean }>(API.findUserByEmail+email).pipe(
      map(response => response.exists)
    );
  }
}
