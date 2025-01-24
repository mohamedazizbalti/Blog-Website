import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import {FooterComponent} from './components/footer/footer.component';
import {PopupComponent} from './components/popup/popup.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, CommonModule, FooterComponent, PopupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
})
export class AppComponent {
  title = 'Blog-Website';

  showNavbar$: Observable<boolean>;

  constructor(private router: Router) {
    this.showNavbar$ = this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event: NavigationEnd) => {
        const hideNavbarRoutes = ['/signin', '/signup'];
        return !hideNavbarRoutes.some(route => event.url.includes(route));
      })
    );
  }
}
