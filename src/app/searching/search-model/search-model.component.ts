import {Component, inject, OnInit , output, signal} from '@angular/core';
import {UserService} from '../../services/userService/user.service';
import {User} from '../../shared/models/user.model';
import {UserCardComponent} from '../../user-card/user-card/user-card.component';
import {FormsModule} from '@angular/forms';
import {FilterService} from '../services/filter.service';
import {debounceTime, distinctUntilChanged, Subject} from 'rxjs';
import {Article} from '../../shared/models/article.model';
import {CommonModule, NgStyle} from '@angular/common';
import { Router } from '@angular/router';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-search-model',
  imports: [UserCardComponent, FormsModule, NgStyle, CommonModule, MatProgressSpinner],
  templateUrl: './search-model.component.html',
  styleUrl: './search-model.component.css',
  standalone: true ,
})
export class SearchModelComponent {
navigateToArticle(arg0: string) {
  this.completeSearch.emit();
  this.router.navigate(['blog/', arg0]);
}

  completeSearch = output();
  filterService = inject(FilterService);
  router = inject(Router);

  close() {
    this.completeSearch.emit();
  }

  userService = inject(UserService);

  users = signal<User[]>([]);
  articles = signal<Article[]>([]);

    isUserSearch  = true;
    userBtnColor  = "white" ;
    artcileBtnColor  = "gray" ;

    loading = false;

  searchTerm :string = '';
  private searchUserSubject = new Subject<string>();
  private searchArticleSubject = new Subject<string>();



  constructor() {
  }

  ngOnInit() {

    this.searchUserSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((searchTerm) => {
      if (searchTerm != "") {
        this.filterService.getFilteredUsers(searchTerm).subscribe(
          (users: User[]) => {
            this.users.set(users);
            this.loading = false ;
          }
        );
      }else{
        this.users.set([]) ;
      }

    });

    this.searchArticleSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((searchTerm) => {
      if(searchTerm != "" ) {
        this.loading = true ;
        this.filterService.getFilteredArticles(searchTerm).subscribe(
          (articles : Article[]) => {
            this.articles.set(articles);
            this.loading = false ;
          }
        );
      }else{
        this.loading = false ;
        this.users.set([]) ;
      }

    });
  }



  onSearchChange(){

      if(this.isUserSearch){
        this.searchUserSubject.next(this.searchTerm);
      }
      else{
        this.searchArticleSubject.next(this.searchTerm);
      }
  }

  userSearch(){
    this.isUserSearch = true ;
    this.onSearchChange();
    this.userBtnColor = "white";
    this.artcileBtnColor = "gray";
  }

  articleSearch(){
    this.isUserSearch = false ;
    this.onSearchChange();
    this.artcileBtnColor = "white";
    this.userBtnColor = "gray";
  }
}

