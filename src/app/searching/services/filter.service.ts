import {inject, Injectable, signal} from '@angular/core';
import {UserService} from '../../services/userService/user.service';
import {User} from '../../shared/models/user.model';
import {Observable, ObservedValueOf, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Article} from '../../shared/models/article.model';
import {API} from '../../../config/api.config';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private http: HttpClient) {}

  getFilteredUsers(searchTerm: string): Observable<User[]> {
    return this.http.get<User[]>(API.searchUser+searchTerm);
  }

  getFilteredArticles(searchTerm : string ):Observable<Article[]> {
    return this.http.get<Article[]>(API.searchArticle+searchTerm);
  }

}
