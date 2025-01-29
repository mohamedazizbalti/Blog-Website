import { Component, inject } from '@angular/core';
import { Article } from '../../shared/models/article.model';
import { ArticleService } from '../../services/articleService/article.service';
import { ActivatedRoute } from '@angular/router';
import { ArticleComponent } from '../article/article.component';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../services/userService/user.service';
import memo from 'memo-decorator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-blog',
  imports: [ArticleComponent,MatProgressSpinnerModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
  standalone :  true
})
export class BlogComponent {
  public article : Article ;
  private  articleService = inject(ArticleService) ;
  private userService = inject(UserService) ;
  private route = inject(ActivatedRoute) ;
  public id : string ;
  public BlogUser : User  ;
  public loading : boolean = false
 constructor() {
  this.article = {} as Article;
  this.id=" ";
  this.BlogUser={} as User ;
}
async getArticleById(id: string) {
  this.articleService.getArticleById(id).subscribe(
    (data) => {
      this.article = data;
      console.log('Article:', this.article); // Log obj here
    },
    (error) => console.error('Error fetching article:', error)
  ).add(() => this.loading = false);
}

async ngOnInit() {
  //get the id from the url
   this.id = this.route.snapshot.paramMap.get('id') as string;
   console.log(this.id);
   this.loading = true
  this.getArticleById(this.id);
  
}
@memo()
getUser(id: string): Observable<User> {
    console.log('observing... fetching user ' + id);
    return this.userService.getUserById(id as string)
  }
}