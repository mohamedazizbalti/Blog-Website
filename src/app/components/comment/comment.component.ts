import { Component, Input, OnInit, Signal, WritableSignal, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Article } from '../../shared/models/article.model';
import { Base64ToBlobPipe } from '../../shared/pipes/b64-to-blob.pipe';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../../services/articleService/article.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-comment',
  imports: [Base64ToBlobPipe, CommonModule, ReactiveFormsModule, UserCardComponent],
  templateUrl: './comment.component.html',
  standalone: true,
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() article!: Article;
  @Input() canComment: boolean = false;
  public user : User  = {} as User;
  private articleService = inject(ArticleService);
  commentForm: FormGroup = new FormGroup({
    content: new FormControl('', [Validators.required]),
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialize form with a default value and validation
    this.commentForm = this.fb.group({
      content: ['', [Validators.required]]
    });
    this.findUserById(this.article.owner);
  }

  // Track by function for loops
  trackByIndex(index: number): number {
    return index;
  }

  findUserById(id: string): void {
    this.articleService.findUserById(id).subscribe(
      (user) => {
        this.user = user ; 
        this.user = {...this.user , image : this.user.image ?? `https://avatar.iran.liara.run/public?username=${this.user.username}`};
        },
        (error) => {
          console.error(error);
        }
        );
      }
  // Handle form submission
  onSubmit(): void {
    if (this.commentForm.valid) {
      const newComment = {
        content: this.commentForm.get('content')?.value || '',
        title: 'random title',
        images: []
      };
      console.log('New comment submitted:', newComment);
      this.articleService.createComment(newComment, this.article.id).subscribe(
        (response) => {
          console.log('Comment created:', response);
        },
        (error) => {
          console.error('Error creating comment:', error);
        }
      );
      // You can also emit the comment to a parent component or make an API call to save the comment.
    }
  }
}
