import {Component, inject} from '@angular/core';
import {Article} from '../../shared/models/article.model';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ArticleService} from '../../services/articleService/article.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-blog',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.css',
  standalone:true
})
export class CreateBlogComponent {

  form :FormGroup;

  private articleService = inject(ArticleService);

  constructor(private location: Location) {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('',  [Validators.required])
    });
  }

  createBlog() {
    console.log(this.form.valid);
    if (this.form.valid ) {
      const {title, content} = this.form.value;
      console.log("all thing good we will create a blog ! ")
      this.articleService.createArtcile({
            images: undefined,
            slug: undefined,
            title: title,
            content: content
          }).subscribe(
        (result :Article)=> {
          this.location.back();
        }
      );
        }

    }


}
