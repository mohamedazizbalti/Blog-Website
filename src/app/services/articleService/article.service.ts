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
    return this.http.get<Article[]>(API.getArticleByUserId+id);
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
  }  getArticleById(id : string) : Observable<Article> {
    return this.http.get<any>(API.getArticleById+id) ;
  
}
createComment(newBlog: newArticle, id: string): Observable<Article> {
  const formData = new FormData();

  // Append the data to FormData, ensuring no undefined values
  formData.append('title', newBlog.title || '');  // Default to an empty string if undefined
  formData.append('content', newBlog.content || '');  // Default to an empty string if undefined
  formData.append('fatherId', id);  // 'id' should always be defined
  formData.append('slug', "");  // Default to an empty string if undefined
  
  // Append images (if any)
  if (newBlog.images) {
    newBlog.images.forEach((image, index)  => {
      // Assuming images are base64 strings, convert them to Blob
      const imageBlob = this.base64ToBlob(image, 'image/jpg');  // Adjust MIME type as necessary
      formData.append('images', imageBlob, `image_${index}.jpg`);
    });
  }
  console.log(formData);
  return this.http.post<Article>(API.createArticle, formData);
}
private base64ToBlob(base64: string, mimeType?: string): Blob {
  // Extract MIME type from Base64 string if not provided
  if (!mimeType && base64.startsWith('data:')) {
    const mimeMatch = base64.match(/data:([^;]+);base64,/);
    mimeType = mimeMatch ? mimeMatch[1] : '';
    base64 = base64.replace(/^data:[^;]+;base64,/, ''); // Remove the prefix
  } else {
    base64 = base64.replace(/^data:[^;]+;base64,/, ''); // Remove the prefix if it exists
  }

  const byteCharacters = atob(base64);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
    const slice = byteCharacters.slice(offset, Math.min(offset + 1024, byteCharacters.length));
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    byteArrays.push(new Uint8Array(byteNumbers));
  }

  return new Blob(byteArrays, { type: mimeType || 'application/octet-stream' });
}


}
