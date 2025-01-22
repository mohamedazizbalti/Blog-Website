import {Component, input} from '@angular/core';

@Component({
  selector: 'app-container',
  imports: [],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css',
  standalone: true
})
export class ContainerComponent {
  title = input<string>('Default Title');
}
