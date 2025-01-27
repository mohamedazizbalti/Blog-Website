import {Component, OnInit, inject, signal, effect} from '@angular/core';
import {User} from '../../shared/models/user.model';
import {UserService} from '../../services/userService/user.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../auth/services/auth.service';
import {PopupService} from '../../services/popupService/popup.service';
import {ArticleListComponent} from '../../components/article-list/article-list.component';
import {Article} from '../../shared/models/article.model';
import {ArticleService} from '../../services/articleService/article.service';
import {ArticleComponent} from '../../components/article/article.component';

@Component({
  selector: 'app-profile',
  imports: [ArticleComponent, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  standalone : true
})
export class ProfileComponent  {

  private userService = inject(UserService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private  popupService = inject(PopupService);
  private articleService = inject(ArticleService);

  id = signal<string>('');

  user = signal<User|null>(null );

  isTheCurrentUserProfile = signal<boolean>(false);

  blogs = signal<Article[]>([]);

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      this.id.set(id); // Update the id signal
    });
    this.fetchUser() ;

    effect(() => {
      console.log('affected ! ');
      const id = this.id();
      if (id) {
        this.fetchUser();
      }
    });
  }

  fetchUser() {
    this.userService.getUserById(this.id()).subscribe({
      next: (user) => {
        this.user.set(user);
        if(this.authService.isAuthenticated()){
          this.isTheCurrentUserProfile.set(this.user()?.email == localStorage.getItem('email') ) ;

        }else{
          this.isTheCurrentUserProfile.set(false) ;
        }
      },
      error: (e) => {
        this.popupService.show(' user with id '+this.id()+' not found !');
        this.router.navigate(['']);
      },
    });
    this.articleService.getArticlesByUserId(this.id()).subscribe({
      next: (article: Article[]) => {
        this.blogs.set(article) ;
      }
    })
  }


}

