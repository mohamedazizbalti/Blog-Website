import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API} from '../../../config/api.config';
import {map} from 'rxjs/operators';
import {Article} from '../../shared/models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {}

  getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(API.getArticle);
  }

  /*
  upvote(id: number) {
    return this.http.post<any>(API.getArticle+"/"+id+"/upvote");
  }
  */
   
}
