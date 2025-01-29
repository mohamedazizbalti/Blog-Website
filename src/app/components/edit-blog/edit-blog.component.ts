import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ArticleService } from '../../services/articleService/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { newArticle } from '../../shared/dto/new-blog.dto'; // Ensure this is the correct path for your DTO
import { Article } from '../../shared/models/article.model';
import { Base64ToBlobPipe } from '../../shared/pipes/b64-to-blob.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule,Base64ToBlobPipe,MatProgressSpinnerModule],
})
export class EditBlogComponent {
  // Injecting the ArticleService and Router
  private articleService = inject(ArticleService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private article: Article = {} as Article;
  private id: string = '';
  public images: string[] = [];
  public loading: boolean = false;
  // Defining the form
  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
  });
  // Helper method to convert base64 to File objects

async LoadArticle() {
  this.id = this.route.snapshot.paramMap.get('id') as string;
  this.loading = true;
  await this.articleService.getArticleById(this.id).subscribe(
    (data) => {
      this.article = data;
      console.log('Article:', this.article); // Log obj here
      this.form.patchValue({
        title: this.article.title,
        content: this.article.content,
      });  
      this.images = this.article.images;
    },
    (error) => {
      console.error('Error:', error); // Log error here
    }
  ).add(() => this.loading=false);
}

  ngOnInit(): void {
    this.LoadArticle(); 
}
  // Handle form submission
  createBlog(): void {
    if (this.form.invalid) {
      console.error('Form is invalid');
      return;
    }
    // Prepare newArticle DTO
    const newBlog: newArticle = {
      title: this.form.get('title')?.value || '',
      content: this.form.get('content')?.value || '',
    };
      this.articleService.updateArticle(this.id, newBlog).subscribe(() => {
        this.router.navigate(['/blog/',this.id]);
      });
  }

  // Helper method to generate a slug from the title
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
}
