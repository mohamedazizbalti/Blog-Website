import { Component, inject } from '@angular/core';
import { UserService } from '../../services/userService/user.service';
import { ArticleService } from '../../services/articleService/article.service';
import { Article } from '../../shared/models/article.model';
import { firstValueFrom, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from '../article/article.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-article-list',
  imports: [NzSpinModule,CommonModule,ArticleComponent,MatProgressSpinnerModule],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css',
  standalone:true
})
export class ArticleListComponent {
  private  userService = inject(UserService) ;
  private  articlesService = inject(ArticleService) ;
  public articles :Article[];
  constructor(){
    this.articles = [];
  }
  async ngOnInit(){

    this.articles = await firstValueFrom (this.articlesService.getAllArticles());
    this.articles.forEach( (art)=>{
      this.userService.getUserById(art.owner as string).subscribe(data=>{
        data.image="https://avatar.iran.liara.run/public?username="+data.username
        art.ownerObject= data
      });
    })
  }


}
