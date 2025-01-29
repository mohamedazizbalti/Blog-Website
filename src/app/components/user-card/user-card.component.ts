import {Component, input, Input} from '@angular/core';
import { User } from '../../shared/models/user.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-card',
  imports: [RouterModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
  standalone: true ,
})
export class UserCardComponent {
   user = input<User|null>(); 
}
