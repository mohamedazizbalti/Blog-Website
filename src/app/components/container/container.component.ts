import {Component, input} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-container',
  imports: [
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css',
  standalone: true
})
export class ContainerComponent {
  title = input<string>('Default Title');
  width = input<string>('500px');
  maxHeight = input<string>('600px');
}
