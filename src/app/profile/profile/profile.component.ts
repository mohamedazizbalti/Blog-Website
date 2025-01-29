import {Component, OnInit, inject, signal, effect} from '@angular/core';
import {User} from '../../shared/models/user.model';
import {UserService} from '../../services/userService/user.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {AuthService} from '../../auth/services/auth.service';
import {PopupService} from '../../services/popupService/popup.service';
import {Article} from '../../shared/models/article.model';
import {ArticleService} from '../../services/articleService/article.service';
import {ArticleHeaderComponent} from '../article-header/article-header.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  imports: [ArticleHeaderComponent, RouterLink,MatProgressSpinnerModule],
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

  deletedArticle : string = '';
  loading = signal<boolean>(true);

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
    }).add(() => this.loading.set(false))
  }

  deleteArticle(id:string ){
    this.deletedArticle = id ;
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this article?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.delete(); // Call the delete function
        Swal.fire('Deleted!', 'Your article has been deleted.', 'success');
      }
    });
  }

  delete(){
    this.articleService.deleteArticle(this.deletedArticle).subscribe((article: Article) => {
        console.log("article deleted !");
        console.log(article);
        this.blogs.update( (blogs:Article[])=>{
          return blogs.filter((blog: Article) => blog.id !== this.deletedArticle)
          }

        )
      }
    ) ;

  }

}
