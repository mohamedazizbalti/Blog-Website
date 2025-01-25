import {Component, input, Input} from '@angular/core';
import { Article } from '../../shared/models/article.model';
import { Base64ToBlobPipe } from '../../shared/pipes/b64-to-blob.pipe';
import { CommentComponent } from '../comment/comment.component';
import {VotingComponent} from '../voting/voting.component';

@Component({
  selector: 'app-article',
  imports: [Base64ToBlobPipe, CommentComponent , VotingComponent ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
  standalone:true

})
export class ArticleComponent {
  ngOnInit(){
    console.log("hello");
  }

  article = input<Article>() ;

  upvote(nb: number){
    // this.article.upvotes += 1;
    // here nrmlmnt we do add the number nb , att not just increment with 1
    // manajemech nzidd ella mane3mel el article service , so lezim zeda nchecki el backend api bech ne3rif ana api I will use
  }
  downvote(nb: number) {
    // this.article.downvotes++;
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
