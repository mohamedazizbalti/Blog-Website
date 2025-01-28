import {Component, computed, inject, input, output, signal} from '@angular/core';
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
  userService = inject(UserService);

  constructor() {

    this.userService.getCurrentUserInfo().subscribe({
      next: (user) => {

        this.userReaction.set(this.voters().find(voter =>  voter.voterId == user.id || null ) ) ;
        this.isLiked  = this.userReaction()?.vote == "upvote";
        this.isDisliked  = this.userReaction()?.vote == "downvote";
      },
      error: () => {
        console.log('Error in getting current user info ! ');
      }
    } );



    console.log(this.userReaction()?.vote);
  }

  numberOfDislike = input<number>(0)  ;
  numberOfLike  = input<number>(0) ;
  voters = input<Voter[]>([]);

  likes = this.numberOfDislike() ;
  dislikes = this.numberOfLike() ;

  onLike = output<void>();
  onDislike = output<void>();

  userReaction = signal<Voter | undefined>(undefined);

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
