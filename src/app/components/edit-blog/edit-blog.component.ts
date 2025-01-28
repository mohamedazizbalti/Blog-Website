import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-edit-blog',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-blog.component.html',
  styleUrl: './edit-blog.component.css',
  standalone:true
})
export class EditBlogComponent {

}
