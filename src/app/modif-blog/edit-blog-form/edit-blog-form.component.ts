import {Component, effect, inject, input} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ArticleService } from '../../services/articleService/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../../shared/models/article.model';
import { Base64ToBlobPipe } from '../../shared/pipes/b64-to-blob.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-edit-blog-form',
  imports: [ReactiveFormsModule,Base64ToBlobPipe,MatProgressSpinnerModule],
  templateUrl: './edit-blog-form.component.html',
  styleUrl: './edit-blog-form.component.css' ,
  standalone:true ,
})
export class EditBlogFormComponent {

  isEdit  = input<boolean>(false);

  private articleService = inject(ArticleService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private article: Article = {} as Article;
  private id: string = '';
  public images: ( Blob & { preview : string })[] = [];

  public loading: boolean = false;

  form : FormGroup ;

  constructor() {

    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
    });

    effect(() => {
      if(this.isEdit()){
        this.LoadArticle();
      }

    });

  }

  LoadArticle() {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.loading = true;
    this.articleService.getArticleById(this.id).subscribe(
      (data) => {
        this.article = data;
        this.form.patchValue({
          title: this.article.title,
          content: this.article.content,
        });
        this.images = this.article.images.map((image,index) => this.base64ToBlobWithPreview(image) ) ;
      },
      (error) => {
        console.error('Error:', error); // Log error here
      }
    ).add(() => this.loading=false);
  }

  createBlog(): void {
    if (this.form.invalid) {
      console.error('Form is invalid');
      return;
    }
    // Prepare newArticle DTO
    const newBlog = {
      title: this.form.get('title')?.value || '',
      content: this.form.get('content')?.value || '',
      images: this.images.map((img)=> new File([img] , "images")),
    };

    if(this.isEdit()){
      this.articleService.updateArticle(this.id, newBlog).subscribe(() => {
        this.router.navigate(['/blog/',this.id]);
      });
    }
    this.articleService.createArticle( newBlog).subscribe((article) => {
      this.router.navigate(['/blog/',article.id]);
    });

  }


  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files) {
      // Append new files to the existing images array
      const newImages = Array.from(files).map(file => {
        return Object.assign(file as File, { preview: URL.createObjectURL(file as Blob) }) as File & { preview: string };
      });

      this.images = [...this.images, ...newImages];
    }
  }

  base64ToBlobWithPreview(base64: string, mimeType: string = 'image/png'): Blob & { preview: string } {
    if (!base64) {
      throw new Error('Base64 string is required');
    }

    // Decode Base64 string
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);

    // Create a Blob
    const blob = new Blob([byteArray], { type: mimeType });

    // Create a preview URL
    return Object.assign(blob, { preview: URL.createObjectURL(blob) });
  }

  removeImage(index: number): void {
    this.images.splice(index, 1);
  }

}
