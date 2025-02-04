import { Routes } from '@angular/router';
import {AuthGuard} from './auth/guard/guard.guard';
import {ArticleListComponent} from './components/article-list/article-list.component';
export const routes: Routes = [
  { path: '', component: ArticleListComponent }, // Default route
  { path: 'signin',
    loadComponent: ()=> import('./auth/signin/signin.component').then(c=>c.SigninComponent) ,
  },
  { path: 'signup',
    loadComponent : ()=> import('./auth/signup/signup.component').then(c=>c.SignupComponent) ,
  },
  { path: 'profile/:id',
    loadComponent : ()=> import('./profile/profile/profile.component').then(c=>c.ProfileComponent) ,
  },
  {path: 'notification',
    loadComponent : ()=> import("./components/notification/notification.component").then(c=>c.NotificationComponent),
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
