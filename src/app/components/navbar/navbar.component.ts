import { Component, inject } from '@angular/core';
import { Router, RouterLinkActive, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import {UserService} from '../../services/userService/user.service';
import {map} from 'rxjs/operators';
import {SearchModelComponent} from '../../searching/search-model/search-model.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink,
    SearchModelComponent
  ],
})
export class NavbarComponent {
  private router = inject(Router);
  authService = inject(AuthService);
  userService = inject(UserService);
  isSearching = false ;

  constructor() {}
  signout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  goToProfile(){
    this.userService.getCurrentUserInfo()
      .pipe(
        map(user => user?.id) // Adjust index as needed
      )
      .subscribe(id => {
        if (id) {
          this.router.navigate(['/profile/' + id]);
        } else {
          console.error('User ID not found');
        }
      });
  }

  search(){
    this.isSearching = true ;
  }

  completeSearch(){
    this.isSearching = false ;
  }
}
