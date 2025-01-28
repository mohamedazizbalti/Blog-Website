import {Component, computed, effect, inject, input, output, signal} from '@angular/core';
import {AuthService} from '../../auth/services/auth.service';
import {Voter} from '../../shared/models/Voter.model';
import {UserService} from '../../services/userService/user.service';

@Component({
  selector: 'app-voting',
  imports: [],
  templateUrl: './voting.component.html',
  styleUrl: './voting.component.css',
  standalone:true
})
export class VotingComponent {

  authService = inject(AuthService);

  constructor() {

    effect(()=>{
      this.userReaction = this.voters().find(voter =>  voter.voterId == localStorage.getItem("userId") || null )  ;
      this.isLiked  = this.userReaction?.vote == "upvote";
      this.isDisliked  = this.userReaction?.vote == "downvote";
      this.likes = this.numberOfLike() ;
      this.dislikes = this.numberOfDislike() ;
    })

  }

  numberOfDislike = input<number>(0)  ;
  numberOfLike  = input<number>(0) ;
  voters = input<Voter[]>([]);

  likes = 0;
  dislikes = 0 ;

  onLike = output<void>();
  onDislike = output<void>();

  userReaction : Voter | undefined = undefined ;

  isLiked : boolean = false;
  isDisliked : boolean = false ;

  likeCliked(){
    console.log("liked ! ");
    if(!this.isLiked ){ // ye3ni mekenitch liked 9bel
      this.likes ++ ;
    }else{ // ye3ni kenit like , on va faire unlike
      this.likes -- ;
    }

    if(this.isDisliked ){ // ye3ni ken disliked , donc on va decrementer le nombre de dislike
      this.dislikes -- ;
    }
    this.isLiked = !this.isLiked ;
    this.isDisliked = false ;

    this.onLike.emit();
  }

  dislikeCliked(){
    console.log("disliked ! ");
    if(!this.isDisliked ){ // mekenitch dislike
      this.dislikes ++ ;
    }else{
      this.dislikes -- ;
    }
    if(this.isLiked ){
      this.likes -- ;
    }
    this.isDisliked = !this.isDisliked ;
    this.isLiked = false ;
    this.onDislike.emit();
  }
}
