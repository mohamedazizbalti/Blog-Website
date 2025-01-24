import { Component, Input } from '@angular/core';
import { Article } from '../../shared/models/article.model';
import { Base64ToBlobPipe } from '../../shared/pipes/b64-to-blob.pipe';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-article',
  imports: [Base64ToBlobPipe, CommentComponent],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',

})
export class ArticleComponent {
  ngOnInit(){
    console.log("hello");
  }
  @Input() article? : Article;
  upvote(){
    // this.article.upvotes++;
  }
  downvote() {
    // this.article.downvotes++;
  }
}
