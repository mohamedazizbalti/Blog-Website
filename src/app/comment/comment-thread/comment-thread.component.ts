import { Component } from '@angular/core';
import { ReplyComponent } from '../reply/reply.component';

@Component({
  selector: 'app-comment-thread',
  templateUrl: './comment-thread.component.html',
  styleUrls: ['./comment-thread.component.css'],
  standalone: true,
  imports: [ReplyComponent]
})
export class CommentThreadComponent {


  upvotes: number = 10;


  // Data for the comment thread
  avatarUrl: string = 'https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp';
  username: string = 'Maria Smantha';
  timestamp: string = '2 hours ago';
  content: string = 'It is a long established fact that a reader will be distracted by the readable content of a page.';

  // Data for the replies
  replies = [
    {
      avatarUrl: 'https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(11).webp',
      username: 'Simona Disa',
      timestamp: '3 hours ago',
      content: 'letters, as opposed to using "Content here, content here", making it look like readable English.',
    },
    {
      avatarUrl: 'https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(12).webp',
      username: 'John Doe',
      timestamp: '1 hour ago',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    }
  ];
}
