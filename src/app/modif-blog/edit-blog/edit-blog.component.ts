import { Component } from '@angular/core';
import {EditBlogFormComponent} from '../edit-blog-form/edit-blog-form.component';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css'],
  standalone: true,
  imports: [ EditBlogFormComponent],
})
export class EditBlogComponent {
}
