import {Component, inject} from '@angular/core';
import {PopupService} from '../../services/popup.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-popup',
  imports: [
    NgIf
  ],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css',
  standalone:true
})
export class PopupComponent {

  private popupService = inject(PopupService);

  isVisible() {
     return this.popupService.isVisible();
  }

  message(){
    return this.popupService.message();
  }
}
