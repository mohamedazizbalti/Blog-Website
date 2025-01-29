import {Component, inject, OnInit , output, signal} from '@angular/core';
import {UserService} from '../../services/userService/user.service';
import {User} from '../../shared/models/user.model';
import {UserCardComponent} from '../../components/user-card/user-card.component';
import {FormsModule} from '@angular/forms';
import {FilterService} from '../services/filter.service';
import {debounceTime, distinctUntilChanged, Subject} from 'rxjs';
import {Article} from '../../shared/models/article.model';
import {CommonModule, NgStyle} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-model',
  imports: [UserCardComponent, FormsModule, NgStyle , CommonModule],
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
        this.filterService.getFilteredArticles(searchTerm).subscribe(
          (articles : Article[]) => {
            this.articles.set(articles);
            console.log(articles);
          }
        );
      }else{
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
    this.userBtnColor = "white";
    this.artcileBtnColor = "gray";
  }

  articleSearch(){
    this.isUserSearch = false ;
    this.artcileBtnColor = "white";
    this.userBtnColor = "gray";
  }
}

