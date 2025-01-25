import { Component, Input } from '@angular/core';
import { Article } from '../../shared/models/article.model';
import { Base64ToBlobPipe } from '../../shared/pipes/b64-to-blob.pipe';
import {VotingComponent} from '../voting/voting.component';

@Component({
  selector: 'app-comment',
  imports: [Base64ToBlobPipe , VotingComponent],
  templateUrl: './comment.component.html',
  standalone: true,
  styleUrl: './comment.component.css'
})
export class CommentComponent {
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
