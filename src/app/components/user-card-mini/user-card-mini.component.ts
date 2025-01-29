import { Component, input } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-card-mini',
  imports: [RouterModule],
  templateUrl: './user-card-mini.component.html',
  styleUrl: './user-card-mini.component.css'
})
export class UserCardMiniComponent {
   user = input<User|null>();
   icon = input<boolean>();
   name = input<boolean>();

}
