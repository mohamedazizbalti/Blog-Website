// notification.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PopupService {

  isVisible = signal(false);
  message = signal('');

  show(message: string, duration: number = 10000) {
    this.message.set(message);
    this.isVisible.set(true);

    setTimeout(() => {
      this.isVisible.set(false);
    }, duration);
  }
}
