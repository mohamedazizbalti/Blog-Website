import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {SigninComponent} from './components/log and register/signin/signin.component';
import {SignupComponent} from './components/log and register/signup/signup.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ThematicComponent} from './components/thematic/thematic.component';
import {NotificationComponent} from './components/notification/notification.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent },

  { path: 'thematic' , component:  ThematicComponent },
  { path: 'notification', component: NotificationComponent },

  { path: '**', redirectTo: '' }
];
