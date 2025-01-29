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
import { Validators } from '@angular/forms';
import {RouterLink, RouterLinkActive} from '@angular/router';  // Make sure to import Validators
import { NzCarouselModule } from 'ng-zorro-antd/carousel';


@Component({
  selector: 'app-article',
  imports: [
    NzCarouselModule,
    Base64ToBlobPipe,
    CommentComponent,
    VotingComponent,
    CommonModule,
    UserCardComponent,
    ReactiveFormsModule,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
  standalone: true
})
export class ArticleComponent {
[x: string]: any;
  ngOnInit() {
    console.log("hello");
  }

  articleService = inject(ArticleService);
  article = input<Article>();
  effect = 'scrollx';

  @Input() owner?: Observable<User>;
  showComment=input<boolean>(true);
  showExitBtn = input<boolean>(false );

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

    if (comment) {
      // Separate fatherId
      const fatherId = comment.fatherId || "";

      // Convert base64 strings in images to File objects
      const images = (comment.images as string[]).map((base64String, index) => {
        const byteString = atob(base64String.split(',')[1]); // Decode base64 string
        const mimeType = base64String.split(',')[0].split(':')[1].split(';')[0]; // Extract MIME type
        const byteNumbers = new Uint8Array(byteString.length);

        for (let i = 0; i < byteString.length; i++) {
          byteNumbers[i] = byteString.charCodeAt(i);
        }

        return new File([byteNumbers], `image_${index}.jpg`, { type: mimeType });
      });

      // Ensure required fields and construct the new comment
      const newComment = {
        title: comment.title || 'Untitled',
        content: comment.content || '',
        slug: comment.slug || '',
        owner: comment.owner || '',
        images // Pass File[] instead of string[]
      };

      console.log('Adding comment:', newComment);

      // Call the service to add the comment
      this.articleService.createComment(newComment, fatherId).subscribe({
        next: (response) => {
          console.log('Comment added successfully', response);
          this.articleService.getArticleById(response.id).subscribe({
            next: (data)=>{

            }
          })
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
