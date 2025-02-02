import { Component } from '@angular/core';
import { CommentThreadComponent } from '../comment-thread/comment-thread.component';

@Component({
  selector: 'app-comment-section',
  imports: [CommentThreadComponent],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.css'
})
export class CommentSectionComponent {

}
