import { Component } from '@angular/core';
import {EditBlogFormComponent} from '../edit-blog-form/edit-blog-form.component';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css'],
  standalone: true,
  imports: [EditBlogFormComponent]
})
export class CreateBlogComponent {

}
