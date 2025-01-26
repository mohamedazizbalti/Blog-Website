import { Component, inject } from '@angular/core';
import { UserService } from '../../services/userService/user.service';
import { ArticleService } from '../../services/articleService/article.service';
import { Article } from '../../shared/models/article.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from '../article/article.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-article-list',
  imports: [NzSpinModule,CommonModule,ArticleComponent,MatProgressSpinnerModule],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css'
})
export class ArticleListComponent {
  private  userService = inject(UserService) ;
  private  articlesService = inject(ArticleService) ;
  public articles :Article[];
  constructor(){
    this.articles = [];
    this.articlesService.getAllArticles().subscribe((data)=>{this.articles=data;})
  }

}
