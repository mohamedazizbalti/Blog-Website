import {inject, Injectable, signal} from '@angular/core';
import {UserService} from '../services/userService/user.service';
import {User} from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  userService = inject(UserService);

  private users: User[] = [] ;

  constructor() { }

  getFilteredUsers(searchTerm: string): User[] {

    this.userService.getAllUsers().subscribe({
      next: (users) => {

        this.users  = users.filter(user => String(user.name).toLowerCase().startsWith(searchTerm.toLowerCase()));

      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
    return  this.users ;

  }


}
