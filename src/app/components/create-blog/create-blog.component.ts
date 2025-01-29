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
  images: (File & { preview: string })[] = []; // Stores file objects with preview

  private articleService = inject(ArticleService);

  constructor(private location: Location) {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      images: new FormControl(''), // This will handle file input values
    });
  }

  // Handles multiple file selection and stacks new images with previous ones
  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files) {
      // Append new files to the existing images array
      const newImages = Array.from(files).map(file => {
        return Object.assign(file as File, { preview: URL.createObjectURL(file as Blob) }) as File & { preview: string };
      });

      this.images = [...this.images, ...newImages]; // Stack new images with existing ones
    }
  }

  // Handles the blog creation logic
  createBlog() {
    if (this.form.valid) {
      const { title, content } = this.form.value;
      this.articleService
        .createArticle({
          title,
          content,
          images: this.images, // Sending the selected images
        })
        .subscribe(() => {
          this.location.back(); // Navigate back after successful creation
        });
    }
  }
  removeImage(index: number): void {
    this.images.splice(index, 1);
  }
  
}
