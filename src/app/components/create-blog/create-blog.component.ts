import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticleService } from '../../services/articleService/article.service';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class CreateBlogComponent {
  form: FormGroup;
  images: (File & { preview: string })[] = [];

  private articleService = inject(ArticleService);

  constructor(private location: Location) {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      images: new FormControl(''),
    });
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files) {
      // Handle all selected files
      this.images = Array.from(files).map(file => {
        return Object.assign(file as File, { preview: URL.createObjectURL(file as Blob) }) as File & { preview: string };
      });
    }
  }

  createBlog() {
    if (this.form.valid) {
      const { title, content } = this.form.value;
      this.articleService
        .createArticle({
          title,
          content,
          images: this.images,
        })
        .subscribe(() => {
          this.location.back();
        });
    }
  }
}
