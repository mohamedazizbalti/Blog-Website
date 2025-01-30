import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import {ProfileComponent} from './profile/profile/profile.component';
import {CreateBlogComponent} from './modif-blog/create-blog/create-blog.component';
import {AuthGuard} from './auth/guard/guard.guard';
import {EditBlogComponent} from './modif-blog/edit-blog/edit-blog.component';
export const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route
  { path: 'signin',
    loadComponent: ()=> import('./auth/signin/signin.component').then(c=>c.SigninComponent) ,
  },
  { path: 'signup',
    loadComponent : ()=> import('./auth/signup/signup.component').then(c=>c.SignupComponent) ,
  },
  { path: 'profile/:id',
    loadComponent : ()=> import('./profile/profile/profile.component').then(c=>c.ProfileComponent) ,
  },
  {path : 'blog',
    children: [
      { path: 'new',
        loadComponent : ()=> import('./modif-blog/create-blog/create-blog.component').then(c=>c.CreateBlogComponent) ,
        canActivate: [AuthGuard]
      },
      { path: 'edit/:id',
        loadComponent : ()=> import('./modif-blog/edit-blog/edit-blog.component').then(c=>c.EditBlogComponent) ,
        canActivate: [AuthGuard]
      },
      { path: ':id',
        loadComponent : ()=> import('./components/blog/blog.component').then(c=>c.BlogComponent) ,
      },
    ]
  },

  { path: '**', redirectTo: '' }

];
