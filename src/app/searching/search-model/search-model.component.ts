import {Component, inject, OnInit , output, signal} from '@angular/core';
import {UserService} from '../../services/userService/user.service';
import {User} from '../../shared/models/user.model';
import {UserCardComponent} from '../../components/user-card/user-card.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-search-model',
  imports: [UserCardComponent, FormsModule],
  templateUrl: './search-model.component.html',
  styleUrl: './search-model.component.css',
  standalone: true ,
})
export class SearchModelComponent {

  completeSearch = output();

  close() {
    this.completeSearch.emit();
  }

  userService = inject(UserService);

  users = signal<User[]>([]);
  searchTerm :string = '';


  constructor() {
    this.getFilteredUsers();
  }

  getFilteredUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => {

        const filteredUsers = users.filter(user => String(user.name).toLowerCase().startsWith(this.searchTerm.toLowerCase()));
        this.users.set(filteredUsers);
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }

  onSearchChange(){
    this.getFilteredUsers();
  }
}

