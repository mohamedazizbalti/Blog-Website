import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import {FooterComponent} from './components/footer/footer.component';
import {PopupComponent} from './components/popup/popup.component';
import { ChatBotComponent } from "./chatbot/chat-bot/chat-bot.component";
import { AuthService } from './auth/services/auth.service';
import { SocketService } from './services/socketService/socket.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, CommonModule, FooterComponent, PopupComponent, ChatBotComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
})
export class AppComponent {
  title = 'Blog-Website';
  authService = inject(AuthService);
  
  showNavbarAndFooter$: Observable<boolean>;

  constructor(private router: Router) {
    this.showNavbarAndFooter$ = this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event: NavigationEnd) => {
        const hideNavbarRoutes = ['/signin', '/signup'];
        return !hideNavbarRoutes.some(route => event.url.includes(route));
      })
    );
  }
  ngOnInit(){
    this.authService.autoLogin()
  }
}
