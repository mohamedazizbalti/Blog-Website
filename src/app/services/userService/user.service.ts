import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { API } from '../../../config/api.config';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  isUsernameTaken(username: string): Observable<boolean> {
    return this.http.get<any>(API.findUserByUsername+username).pipe(
      map(response => !!response),
      catchError(error => {
        return of(false);
      })
    );
  } // actually this logic is due to the response of the  back : it retruns the user (json) if it exists otherwise it return error 404

  isEmailTaken(email: string): Observable<boolean> {
    return this.http.get<any>(API.findUserByEmail+email).pipe(
      map((response) => !!response)
    );
  }// the logic of the response backend here is different (cas email ) it return the user or nothing ( not error )

  getUserById(id : string ) : Observable<User> {
    return this.http.get<any>(API.findUserById+id);
  }

  getCurrentUserInfo() : Observable<User> {
    return this.http.get<User>(API.getCurrentUserInfo);
  }

  getAllUsers() : Observable<User[]> {
    return this.http.get<User[]>(API.getAllUsers);
  }
}
