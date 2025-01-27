import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API} from '../../../config/api.config';
import {map} from 'rxjs/operators';
import {Article} from '../../shared/models/article.model';
import {newArticle} from '../../shared/dto/new-blog.dto';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {}

  getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(API.getArticleFull);
  }

  upvote(id: string) {
    return this.http.post<any>(`${API.getArticle}/${id}/upvote`, null);
  }


  downvote(id: string) {
    return this.http.post<any>(`${API.getArticle}/${id}/downvote`, null);
  }

  getArticlesByUserId(id : string):Observable<Article[]>{
    return this.http.get<Article[]>(API.getArticleFull+id);
  }

  getArticleOfCurrentUser():Observable<Article[]> {
    return this.http.get<Article[]>(API.getArticleProperties);
  }

  createArtcile(newBlog : newArticle ) : Observable<Article> {
    return this.http.post<Article>(API.createArticle,{
      title: newBlog.title,
      content: newBlog.content,
      fatherId: null,
      slug: newBlog.slug,
      images: newBlog.images,
    });
  }

}
