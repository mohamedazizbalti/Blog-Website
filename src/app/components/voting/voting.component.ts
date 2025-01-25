import { Component } from '@angular/core';

@Component({
  selector: 'app-voting',
  imports: [],
  templateUrl: './voting.component.html',
  styleUrl: './voting.component.css',
  standalone:true
})
export class VotingComponent {

  numberOfDislike = 10000  ;
  numberOfLike  = 20 ;

}
