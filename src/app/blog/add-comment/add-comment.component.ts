import {Component, inject, input, output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Article} from '../../shared/models/article.model';
import {ArticleService} from '../../services/articleService/article.service';
import {newArticle} from '../../shared/dto/new-blog.dto';

@Component({
  selector: 'app-add-comment',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-comment.component.html',
  styleUrl: './add-comment.component.css',
  standalone: true,
})
export class AddCommentComponent {

  private articleService = inject(ArticleService);
  articleId = input<string|undefined>('');
  commentAddedEvent = output<newArticle>();

  commentForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl('', [Validators.required]),  // Make content field required
    images: new FormControl<string[]>([])
  });

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
    console.log("preparing comment");
    const comment = {
      title: 'random title',
      content: this.commentForm.value.content || '',
      fatherId: this.articleId || null,
      slug: this.generateSlug(this.commentForm.value.title || ''),
      owner: localStorage.getItem('userId'),
      images: this.commentForm.value.images || []
    };
    this.commentForm.reset();
    return comment;
  }

  addComment() {
    const comment = this.prepareComment();

    if (comment) {

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
        images,
        comments: [] as Article[]

      };
      this.commentAddedEvent.emit(newComment);
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
