import {Component, inject, input, output} from '@angular/core';
import {AuthService} from '../../auth/services/auth.service';

@Component({
  selector: 'app-voting',
  imports: [],
  templateUrl: './voting.component.html',
  styleUrl: './voting.component.css',
  standalone:true
})
export class VotingComponent {

  authService = inject(AuthService);

  numberOfDislike = input<number>(0)  ;
  numberOfLike  = input<number>(0) ;

  onLike = output<number>();
  onDislike = output<number>();

  isLiked : boolean = false;
  isDisliked : boolean = false;

  likeCliked(){
    console.log("liked ! ");
    if(!this.isLiked ){ // ye3ni mekenitch liked 9bel
      this.onLike.emit(1);
    }
    if(this.isDisliked ){ // ye3ni ken disliked , donc on va decrementer le nombre de dislike
      this.onDislike.emit(-1);
    }
    this.isLiked = true ;
    this.isDisliked = false ;
  }

  dislikeCliked(){
    console.log("disliked ! ");
    if(!this.isDisliked ){ // mekenitch dislike
      this.onDislike.emit(1);
    }
    if(this.isLiked ){
      this.onLike.emit(-1);
    }
    this.isDisliked = true ;
    this.isLiked = false ;
  }
}
