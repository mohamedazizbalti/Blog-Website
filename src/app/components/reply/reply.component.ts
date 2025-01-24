import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css'],
  standalone: true
})
export class ReplyComponent {
  @Input() avatarUrl: string = 'https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(11).webp';
  @Input() username: string = 'Simona Disa';
  @Input() timestamp: string = '3 hours ago';
  @Input() content: string = 'letters, as opposed to using "Content here, content here", making it look like readable English.';
}
