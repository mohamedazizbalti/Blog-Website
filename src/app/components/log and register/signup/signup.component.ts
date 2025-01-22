import { Component } from '@angular/core';
import {ContainerComponent} from '../container/container.component';

@Component({
  selector: 'app-signup',
  imports: [ContainerComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  standalone:true
})
export class SignupComponent {

}
