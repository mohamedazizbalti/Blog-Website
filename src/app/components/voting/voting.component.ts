import {Component, inject, input, output} from '@angular/core';
import {AuthService} from '../../auth/services/auth.service';
import {Voter} from '../../shared/models/Voter.model';

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
  voters = input<Voter[]>([]);

  onLike = output<number>();
  onDislike = output<number>();

  userReaction = this.voters().find(voter => voter.voterId === localStorage.getItem("userId"))?.vote || null;

  isLiked : boolean = this.userReaction == "upvote";
  isDisliked : boolean = this.userReaction == "downvote";

  likeCliked(){
    console.log("liked ! ");
    if(!this.isLiked ){ // ye3ni mekenitch liked 9bel
      this.onLike.emit(1);
    }else{ // ye3ni kenit like , on va faire unlike
      this.onLike.emit(-1);
    }

    if(this.isDisliked ){ // ye3ni ken disliked , donc on va decrementer le nombre de dislike
      this.onDislike.emit(-1);
    }
    this.isLiked = !this.isLiked ;
    this.isDisliked = false ;
  }

  dislikeCliked(){
    console.log("disliked ! ");
    if(!this.isDisliked ){ // mekenitch dislike
      this.onDislike.emit(1);
    }else{
      this.onDislike.emit(-1);
    }
    if(this.isLiked ){
      this.onLike.emit(-1);
    }
    this.isDisliked = !this.isDisliked ;
    this.isLiked = false ;
  }
}
