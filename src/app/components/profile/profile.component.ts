import { Component, OnInit, inject } from '@angular/core';
import {User} from '../../shared/models/user.model';
import {UserService} from '../../services/userService/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../auth/services/auth.service';
import {PopupService} from '../../services/popupService/popup.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  standalone : true
})
export class ProfileComponent {

  private userService = inject(UserService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private  popupService = inject(PopupService);

  constructor() {}

  user : User | null = null;
  isTheCurrentUserProfile : boolean = false;

  ngOnInit()
  {
    const id = this.activatedRoute.snapshot.params['id'];
    this.userService.getUserById(id).subscribe({
      next: (user) => {
        this.user = user;
        if(this.authService.isAuthenticated()){
          this.isTheCurrentUserProfile = this.user?.email == localStorage.getItem('email') ;
        }else{
          this.isTheCurrentUserProfile = false;
        }
      },
      error: (e) => {
        this.popupService.show('You must be logged in to access this page.');
        this.router.navigate(['']);
      },
    });
  }

}

