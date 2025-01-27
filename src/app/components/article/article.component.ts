import {Component, inject, input, Input} from '@angular/core';
import { Article } from '../../shared/models/article.model';
import { Base64ToBlobPipe } from '../../shared/pipes/b64-to-blob.pipe';
import { CommentComponent } from '../comment/comment.component';
import {VotingComponent} from '../voting/voting.component';
import {ArticleService} from '../../services/articleService/article.service';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from "../user-card/user-card.component";
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-article',
  imports: [Base64ToBlobPipe, CommentComponent, VotingComponent, CommonModule, UserCardComponent],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
  standalone:true

})
export class ArticleComponent {
  ngOnInit(){
    console.log("hello");
  }

  articleService = inject(ArticleService);
  article = input<Article>() ;
  @Input() owner? : Observable<User> ;

  upvote(nb: number){
    this.articleService.upvote(<string>this.article()?.id).subscribe({
      next: (response) => {
        console.log('Upvote successful', response);
      },
      error: (error) => {
        console.error('Upvote failed', error);
      }
    });
  }
  downvote(nb: number) {
    this.articleService.downvote(<string>this.article()?.id).subscribe({
      next: (response) => {
        console.log('donvote successful', response);
      },
      error: (error) => {
        console.error('downvote failed', error);
      }
    });
  }

  test1 = 20 ;
  test2 = 23 ;
  upvote2(nb: number) {
    this.test2 += nb ;
  }
  downvote2(nb: number) {
    this.test1 += nb ;
  }
}
