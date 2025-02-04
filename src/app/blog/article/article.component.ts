import {Component, effect, inject, input, Input, output, signal} from '@angular/core';
import { Article } from '../../shared/models/article.model';
import { Base64ToBlobPipe } from '../../shared/pipes/b64-to-blob.pipe';
import { CommentComponent } from '../../comment/comment/comment.component';
import { VotingComponent } from '../voting/voting.component';
import { ArticleService } from '../../services/articleService/article.service';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from "../../user-card/user-card/user-card.component";
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import {RouterLink, RouterLinkActive} from '@angular/router';  // Make sure to import Validators
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import {AuthService} from '../../auth/services/auth.service';
import {newArticle} from '../../shared/dto/new-blog.dto';
import {AddCommentComponent} from '../add-comment/add-comment.component';


@Component({
  selector: 'app-article',
  imports: [
    NzCarouselModule,
    Base64ToBlobPipe,
    CommentComponent,
    VotingComponent,
    CommonModule,
    UserCardComponent,
    ReactiveFormsModule,
    RouterLinkActive,
    RouterLink,
    AddCommentComponent
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
  standalone: true
})
export class ArticleComponent {
[x: string]: any;
  constructor() {
    console.log("hello");

    effect(()=>{
      this.comments.set( this.article()?.comments ?? [] )  ;
    } )
  }

  authService = inject(AuthService);
  articleService = inject(ArticleService);
  article = input<Article>();
  effect = 'scrollx';
  comments  = signal<Article[]>( [] ) ;

  @Input() owner?: Observable<User>;

  showComment=input<boolean>(true);
  showExitBtn = input<boolean>(false );

  upvote() { this.articleService.upvote(<string>this.article()?.id).subscribe();}

  downvote() { this.articleService.downvote(<string>this.article()?.id).subscribe();}

  addComment(newComment : newArticle ){
    this.articleService.createComment(newComment, <string> this.article()?.id ).subscribe({
      next: (response) => {
        console.log('Comment added successfully', response);
        this.comments.update((comment : Article[]) => {
          comment.push(response)  ;
          return comment ;
        }) ;
      },
      error: (error) => {
        console.error('Error adding comment', error);
      }
    });
  }
}
