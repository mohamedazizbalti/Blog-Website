import {Component, inject, input , output} from '@angular/core';
import {Article} from '../../shared/models/article.model';
import {AuthService} from '../../auth/services/auth.service';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from '@angular/router';


@Component({
  selector: 'app-article-header',
  imports: [CommonModule , RouterLink],
  templateUrl: './article-header.component.html',
  styleUrl: './article-header.component.css',
  standalone:true
})
export class ArticleHeaderComponent {

  article = input<Article|null>(null);
  isTheCurrentUserProfile = input<boolean>(false);
  deleteArticle = output<string>();

  router = inject(Router);
  constructor() {
  }

  delete(){
    this.deleteArticle.emit(<string>this.article()?.id);
  }
  goToArticle() {
    if (this.article()) {
      this.router.navigate(['/blog', this.article()?.id]);
    }
  }

}
