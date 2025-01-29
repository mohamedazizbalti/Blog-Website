import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {NotificationComponent} from './components/notification/notification.component';
import {SigninComponent} from './auth/signin/signin.component';
import {SignupComponent} from './auth/signup/signup.component';
import { BlogComponent } from './components/blog/blog.component';
import {ProfileComponent} from './profile/profile/profile.component';
import {CreateBlogComponent} from './components/create-blog/create-blog.component';
import {AuthGuard} from './auth/guard/guard.guard';
import {EditBlogComponent} from './components/edit-blog/edit-blog.component';
export const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile/:id', component: ProfileComponent  },
  { path: 'notification', component: NotificationComponent },
  {path : 'blog',
    children: [
      { path: 'new', component: CreateBlogComponent , canActivate: [AuthGuard] },
      { path: 'edit/:id', component:  EditBlogComponent , canActivate: [AuthGuard] },
      { path: ':id', component: BlogComponent },
    ]
  },

  { path: '**', redirectTo: '' }
];
