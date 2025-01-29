import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ResquestDto } from '../dto/request.dto';
import { API } from '../../../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private http = inject(HttpClient);

  constructor() {}

  getBotResponse(request: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + API.chatbotKey
    });
    
    const httpRequest = new HttpRequest(
      'POST',
      API.chatbot,
      request,
      { headers, withCredentials: false, reportProgress: false }
    );
  
    return this.http.request(httpRequest);
  }
  
}
