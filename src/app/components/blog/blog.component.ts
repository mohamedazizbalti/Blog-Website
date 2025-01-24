import { Component } from '@angular/core';
import { CommentSectionComponent } from '../comment-section/comment-section.component';

@Component({
  selector: 'app-blog',
  imports: [CommentSectionComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
  standalone :  true
})
export class BlogComponent {
  

}
