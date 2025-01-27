import { Component, OnInit, inject } from '@angular/core';
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
export class ProfileComponent {

  private userService = inject(UserService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private  popupService = inject(PopupService);
  private articleService = inject(ArticleService);

  constructor() {}

  user : User | null = null;
  isTheCurrentUserProfile : boolean = false;
  blogs : Article[] = [] ;

  ngOnInit()
  {
    const id = this.activatedRoute.snapshot.params['id'];
    this.userService.getUserById(id).subscribe({
      next: (user) => {
        this.user = user;
        if(this.authService.isAuthenticated()){
          this.isTheCurrentUserProfile = this.user?.email == localStorage.getItem('email') ;

        }else{
          this.isTheCurrentUserProfile = false;
        }
      },
      error: (e) => {
        this.popupService.show(' user with id '+id+' not found !');
        this.router.navigate(['']);
      },
    });
    this.articleService.getArticleOfCurrentUser().subscribe({
      next: (article: Article[]) => {
        this.blogs = article ;
      }
    })
  }

}

