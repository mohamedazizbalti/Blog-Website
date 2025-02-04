import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../../../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

    constructor(private http: HttpClient) {}


  getAllNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(API.getMyNotifs);
  }

}
