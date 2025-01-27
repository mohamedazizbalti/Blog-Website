import { Component } from '@angular/core';
import { ArticleComponent } from '../article/article.component';
import { Article } from '../../shared/models/article.model';
import { ArticleListComponent } from "../article-list/article-list.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
  imports: [ArticleListComponent, ArticleListComponent]
})
export class HomeComponent {

}
