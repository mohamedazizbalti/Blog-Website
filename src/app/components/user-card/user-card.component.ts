import { Component, Input } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-card',
  imports: [RouterModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input() user: User | null = null; // Input property for the user object

}
