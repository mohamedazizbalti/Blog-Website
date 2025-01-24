import {Component, inject} from '@angular/core';
import {PopupService} from '../../services/popupService/popup.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-popupService',
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
