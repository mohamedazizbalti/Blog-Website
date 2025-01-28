import {Component, inject, input, Input} from '@angular/core';
import { Article } from '../../shared/models/article.model';
import { Base64ToBlobPipe } from '../../shared/pipes/b64-to-blob.pipe';
import { CommentComponent } from '../comment/comment.component';
import { VotingComponent } from '../voting/voting.component';
import { ArticleService } from '../../services/articleService/article.service';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from "../user-card/user-card.component";
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';  // Make sure to import Validators


@Component({
  selector: 'app-article',
  imports: [
    Base64ToBlobPipe, 
    CommentComponent, 
    VotingComponent, 
    CommonModule, 
    UserCardComponent,
    ReactiveFormsModule
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
  standalone: true
})
export class ArticleComponent {
  ngOnInit() {
    console.log("hello");
  }

  articleService = inject(ArticleService);
  article = input<Article>();
  @Input() owner?: Observable<User>;

  commentForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl('', [Validators.required]),  // Make content field required
    images: new FormControl<string[]>([])
  });

  selectedImages: File[] = [];

  upvote() {
    this.articleService.upvote(<string>this.article()?.id).subscribe({
      next: (response) => {
        console.log('Upvote successful', response);
      },
      error: (error) => {
        console.error('Upvote failed', error);
      }
    });
  }

  downvote() {
    this.articleService.downvote(<string>this.article()?.id).subscribe({
      next: (response) => {
        console.log('downvote successful', response);
      },
      error: (error) => {
        console.error('downvote failed', error);
      }
    });
  }

  onImageSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            const base64String = e.target.result as string;
            const currentImages = this.commentForm.get('images')?.value || [];
            this.commentForm.patchValue({
              images: [...currentImages, base64String]
            });
          }
        };
        reader.readAsDataURL(file);
      });
    }
  }

  prepareComment() {
    if (this.article()) {
      console.log("preparing comment");
      const comment = {
        title: 'random title',
        content: this.commentForm.value.content || '',
        fatherId: this.article()?.id || null,
        slug: this.generateSlug(this.commentForm.value.title || ''),
        owner: localStorage.getItem('userId'),
        images: this.commentForm.value.images || []
      };
      this.commentForm.reset();
      return comment;
    }
    return null;
  }
  addComment() {
    console.log("adding comment");
    const comment = this.prepareComment();
    console.log('Prepared comment:', comment);
    // Separate comment from its fatherId into two objects
    const fatherId = comment?.fatherId || "";
    
    // Remove fatherId from comment object and ensure required fields have default values
    const newComment = {
      title: comment?.title || 'Untitled',  // Default value for title if undefined
      content: comment?.content || '',      // Default empty string for content if undefined
      slug: comment?.slug || '',            // Default empty string for slug if undefined
      owner: comment?.owner || '',          // Default empty string for owner if undefined
      images: comment?.images || []         // Default empty array for images if undefined
    };
  
    if (comment) {
      console.log('Adding comment:', newComment);
      this.articleService.createComment(newComment, fatherId).subscribe({
        next: (response) => {
          console.log('Comment added successfully', response);
        },
        error: (error) => {
          console.error('Error adding comment', error);
        }
      });
    } else {
      console.error('Failed to prepare comment');
    }
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
}