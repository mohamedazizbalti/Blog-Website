import { Component, HostListener, inject } from '@angular/core';
import { UserService } from '../../services/userService/user.service';
import { ArticleService } from '../../services/articleService/article.service';
import { Article } from '../../shared/models/article.model';
import { firstValueFrom, map, Observable, shareReplay } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from '../../blog/article/article.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { User } from '../../shared/models/user.model';
import memo from 'memo-decorator';
import { Router } from '@angular/router';
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
  private router = inject(Router);
  private page :number
  private limit : number;
  private end : boolean;
  public loading :boolean;
  public articles: Article[];
  public error: string | null = null;
  constructor() {
    this.articles = [];
    this.page = 1;
    this.limit = 3;
    this.loading=false;
    this.end=false;
  }
  // memorizing the observable so the same user is not fetched twice

  private userCache = new Map<string, Observable<User>>();

  getUser(id: string): Observable<User> {
    if (this.userCache.has(id)) {
      return this.userCache.get(id)!;
    }

    console.log('Fetching user ' + id);
    const user$ = this.userService.getUserById(id).pipe(shareReplay(1));
    this.userCache.set(id, user$);
    return user$;
  }
  getImagesOfArticle(article:Article,id:string){
    this.articlesService.getImagesByArticle(id).subscribe((data)=>article.images=data);
  }

  getImages(id:string){
    return this.articlesService.getImagesByArticle(id)
  }
  retry(){
    this.error=null;
    this.getArticles()
  }
  getArticles() {
    this.articlesService.find({comments:false,images:false,content:true}).subscribe(
      (data) =>{

        this.articles = data
        data.forEach(article=>this.getImagesOfArticle(article,article.id))
      },
      (err) =>
        (this.error = 'Error occured while fetching data, please try again')
    );
  }
  loadArticles(): void {
    if (this.loading) return;

    this.loading = true;
    this.articlesService.find({page:this.page, limit:this.limit}).subscribe({
      next: (data) => {
        if (!data.length)
          this.end=true;
        this.articles = [...this.articles, ...data];
        this.page++;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching articles:', err);
        this.loading = false;
      },
    });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    console.log("window.innerHeight");
    console.log(window.innerHeight);
    console.log("window.scrollY");
    console.log(window.scrollY);
    console.log("document.body.offsetHeight");
    console.log(document.body.offsetHeight);
    console.log("loading");
    console.log(this.loading);
    if ((document.documentElement.scrollHeight- (window.innerHeight + window.scrollY)) <=500 &&( !this.loading && !this.end)) {
      this.loadArticles()
    }
  }
  navigateToBlog(id: string): void {
    this.router.navigate(['/blog', id]);
  }

  async ngOnInit() {
    this.loadArticles();
    /*   this.articles.forEach( (art)=>{
      this.userService.getUserById(art.owner as string).subscribe(data=>{
        data.image="https://avatar.iran.liara.run/public?username="+data.username
      });
    }) */
  }
}
