import { Component, inject } from '@angular/core';
import { UserService } from '../../services/userService/user.service';
import { ArticleService } from '../../services/articleService/article.service';
import { Article } from '../../shared/models/article.model';
import { firstValueFrom, map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from '../article/article.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { User } from '../../shared/models/user.model';
import memo from 'memo-decorator';
@Component({
  selector: 'app-article-list',
  imports: [
    NzSpinModule,
    CommonModule,
    ArticleComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css',
  standalone: true,
})
export class ArticleListComponent {
  private userService = inject(UserService);
  private articlesService = inject(ArticleService);
  public articles: Article[];
  public error: string | null = null;
  constructor() {
    this.articles = [];
  }
  // memorizing the observable so the same user is not fetched twice
  @memo()
  getUser(id: string): Observable<User> {
    console.log('observing... fetching user ' + id);
    return this.userService.getUserById(id as string)
  }
  retry(){
    this.error=null;
    this.getArticles()
  }
  getArticles() {
    this.articlesService.getAllArticles().subscribe(
      (data) => (this.articles = data),
      (err) =>
        (this.error = 'Error occured while fetching data, please try again')
    );
  }
  async ngOnInit() {
    this.getArticles()
    /*   this.articles.forEach( (art)=>{
      this.userService.getUserById(art.owner as string).subscribe(data=>{
        data.image="https://avatar.iran.liara.run/public?username="+data.username
      });
    }) */
  }
}
